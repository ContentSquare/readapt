<script lang="ts">
/* global Office */
import { computed, defineComponent, onMounted, ref, unref } from '@vue/composition-api'
import { BButton, BFormCheckbox, BFormSelect, BIconList, BSidebar, BTableSimple, BTbody, BTd, BTh, BTr } from 'bootstrap-vue'

import {
  fontFamilyOptions,
  fontSizeOptions,
  languageOptions,
  letterSpacingOptions,
  lineSpacingOptions,
  opacityOptions,
  Option,
  Settings,
  SettingsKey,
  thicknessOptions,
  wordSpacingOptions
} from '@readapt/settings'
import { AdaptContainer, RangeBar, SelectPercentage } from '@readapt/shared-components'

import store from '@/store'
import i18n from '@/i18n'
import { adaptHtmlElementAsyncFn } from '@/visualEngine/adaptHtmlElementAsync'

const DialogBox = defineComponent({
  components: {
    BButton,
    BTableSimple,
    BTbody,
    BTr,
    BTd,
    BTh,
    BIconList,
    BSidebar,
    BFormCheckbox,
    BFormSelect,
    AdaptContainer,
    SelectPercentage,
    RangeBar
  },
  setup() {
    const error = ref<string>('')
    const userPlatform = ref<Office.PlatformType>()

    const heightMask = 25
    const BASE_COLOR = '#000000'

    const settings = computed<Settings>(() => store.getters.getSettings)
    const allItemsLettersActive = computed<boolean>(() => store.getters.getLettersActive)
    const allItemsPhonemesActive = computed<boolean>(() => store.getters.getPhonemesActive)

    const lineSpacingOptionsOptimized = computed<Option[]>(() => {
      const { shadeAlternateLinesActive } = settings.value
      return shadeAlternateLinesActive ? lineSpacingOptions.slice(1) : lineSpacingOptions
    })

    const ruler = ref<HTMLDivElement>()
    const mask = ref<HTMLDivElement>()
    const maskBeforeReadingZone = ref<HTMLDivElement>()
    const maskReadingZone = ref<HTMLDivElement>()
    const maskAfterReadingZone = ref<HTMLDivElement>()
    const topBarZone = ref<HTMLDivElement>()

    const rulerSettings = ref({
      enabled: false,
      thickness: thicknessOptions[0].value,
      opacity: opacityOptions[0].value
    })

    const maskSettings = ref({
      enabled: false,
      thickness: thicknessOptions[0].value,
      opacity: opacityOptions[0].value
    })

    const docHtml = ref<string>('')

    const onMessage = (event: Office.DialogParentMessageReceivedEventArgs) => {
      try {
        const message = event.message
        const { html, settings, lang } = JSON.parse(message)
        docHtml.value = html
        store.commit('updateSettings', settings)
        i18n.locale = lang
      } catch (e) {
        error.value = 'error'
      }
    }

    const sendReady = (): void => {
      Office.context.ui.messageParent('ready', { targetOrigin: '*' })
    }

    const onRegister = (asyncResult: Office.AsyncResult<unknown>): void => {
      sendReady()
      if (asyncResult.status !== Office.AsyncResultStatus.Succeeded) {
        error.value = asyncResult.error.message
      }
    }

    onMounted(() => {
      Office.onReady((info: { platform: Office.PlatformType }) => {
        Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, onMessage, onRegister)
        userPlatform.value = info.platform
      })

      document.addEventListener('mousemove', (event: MouseEvent) => {
        if (mask.value) {
          const heightMax = document.body.scrollHeight
          mask.value.style.height = `${heightMax.toString()}px`
        }

        if (topBarZone.value && event.pageY > topBarZone.value.offsetHeight) {
          if (ruler.value && rulerSettings.value.enabled) {
            ruler.value.style.top = `${event.pageY}px`
          }
          if (maskBeforeReadingZone.value && maskSettings.value.enabled) {
            maskBeforeReadingZone.value.style.height = `${event.pageY - topBarZone.value.offsetHeight - 20}px`
          }
        }
      })
    })

    const print = () => {
      window.print()
    }

    // RULER
    const toggleRuler = () => {
      if (maskSettings.value.enabled) maskSettings.value.enabled = false
      rulerSettings.value.enabled = !rulerSettings.value.enabled
      document.body.className = rulerSettings.value.enabled ? 'showruler' : ''
    }

    const rulerUpdateThickness = (thickness: string) => {
      const rulerElem = unref(ruler) as HTMLDivElement
      rulerSettings.value.thickness = thickness
      rulerElem.style.borderTopWidth = `${thickness}px`
    }

    const rulerUpdateOpacity = (opacity: string) => {
      const ruleElem = unref(ruler) as HTMLDivElement

      ruleElem.style.borderColor = BASE_COLOR + opacity
      rulerSettings.value.opacity = opacity
    }

    // MASK
    const toggleMask = () => {
      if (rulerSettings.value.enabled) rulerSettings.value.enabled = false
      maskSettings.value.enabled = !maskSettings.value.enabled
      document.body.className = maskSettings.value.enabled ? 'showmask' : ''
    }

    const maskUpdateThickness = (thickness: string) => {
      const maskReadingZoneElem = unref(maskReadingZone) as HTMLDivElement
      maskReadingZoneElem.style.height = `${(heightMask * parseInt(thickness)).toString()}px`
      maskSettings.value.thickness = thickness
    }

    const maskUpdateOpacity = (opacity: string) => {
      const maskBeforeReadingZoneElem = unref(maskBeforeReadingZone) as HTMLElement
      const maskAfterReadingZoneElem = unref(maskAfterReadingZone) as HTMLElement

      maskBeforeReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
      maskAfterReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
      maskSettings.value.opacity = opacity
    }

    // OPTIONS
    const updateOption = (key: SettingsKey, value: unknown) => store.commit('updateOption', { key, value })

    const updateShadeAlternateLines = (shadeAlternateLinesActive: string) => {
      updateOption('shadeAlternateLinesActive', shadeAlternateLinesActive)
      // change lineSpacing value if lineSpacingOptionsOptimized has changed and current value is not selectable
      if (lineSpacingOptionsOptimized.value.length !== lineSpacingOptions.length && settings.value.lineSpacing === lineSpacingOptions[0].value) {
        updateOption('lineSpacing', lineSpacingOptionsOptimized.value[0].value)
      }
    }

    return {
      error,
      settings,
      docHtml,
      print,
      userPlatform,
      fontFamilyOptions,
      fontSizeOptions,
      languageOptions,
      letterSpacingOptions,
      wordSpacingOptions,
      lineSpacingOptionsOptimized,
      updateOption,
      updateShadeAlternateLines,
      allItemsLettersActive,
      allItemsPhonemesActive,
      opacityOptions,
      thicknessOptions,
      maskSettings,
      maskUpdateThickness,
      maskUpdateOpacity,
      toggleMask,
      rulerSettings,
      rulerUpdateThickness,
      rulerUpdateOpacity,
      toggleRuler,
      topBarZone,
      mask,
      maskBeforeReadingZone,
      maskReadingZone,
      maskAfterReadingZone,
      ruler,
      adaptHtmlElementAsyncFn
    }
  }
})
export default DialogBox
</script>

<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div class="container-fluid">
      <div id="topbar" ref="topBarZone" class="sticky-top top-bar">
        <b-button v-if="userPlatform !== 'Mac'" size="sm" variant="primary" @click="print()" style="margin-right: 10px">
          {{ $t('DIALOG_BOX.PRINT') }}
        </b-button>
        <b-form-checkbox :checked="maskSettings.enabled" @change="toggleMask()" inline switch>
          {{ $t('DIALOG_BOX.MASK') }}
        </b-form-checkbox>
        <b-form-checkbox :checked="rulerSettings.enabled" @change="toggleRuler()" inline switch>
          {{ $t('DIALOG_BOX.RULER') }}
        </b-form-checkbox>

        <b-button class="float-right" size="sm" v-b-toggle.sidebar-1>
          <b-icon-list font-scale="1.5" />
        </b-button>
        <div class="px-3 py-2">
          <b-sidebar id="sidebar-1" :title="$t('DIALOG_BOX.QUICK_ACTIVATE')" width="530px" right shadow>
            <b-table-simple striped responsive class="mb-0">
              <b-tbody>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.FONT') }}</b-th>
                  <b-td>
                    <b-form-select :options="fontFamilyOptions" :value="settings.fontFamily" @change="updateOption('fontFamily', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.FONT_SIZE') }}</b-th>
                  <b-td>
                    <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.LETTER_SPACING') }}</b-th>
                  <b-td>
                    <SelectPercentage
                      :options="letterSpacingOptions"
                      :value="settings.letterSpacing"
                      @change="updateOption('letterSpacing', $event)"
                    />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.WORD_SPACING') }}</b-th>
                  <b-td>
                    <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @change="updateOption('wordSpacing', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.LINE_SPACING') }}</b-th>
                  <b-td>
                    <SelectPercentage
                      :options="lineSpacingOptionsOptimized"
                      :value="settings.lineSpacing"
                      @change="updateOption('lineSpacing', $event)"
                    />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.syllableActive" @change="updateOption('syllableActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.GREY_SILENT_LETTERS') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.silentLetterActive" @change="updateOption('silentLetterActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('SETTINGS.ALL_PHONEMES_SETTINGS') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="allItemsPhonemesActive" @change="updateOption('phonemesActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('SETTINGS.ALL_LETTERS_SETTINGS') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="allItemsLettersActive" @change="updateOption('lettersActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr v-if="settings.language === 'fr'">
                  <b-th class="bg-white">{{ $t('GENERAL.SHOW_LIAISONS') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.liaisonsActive" @change="updateOption('liaisonsActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.SHADE_ALTERNATE_LINES') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.shadeAlternateLinesActive" @change="updateShadeAlternateLines" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white" rowspan="2">{{ $t('DIALOG_BOX.READING_MASK') }}</b-th>
                  <b-td>{{ $t('GENERAL.OPACITY') }}</b-td>
                  <b-td>
                    <RangeBar :value="maskSettings.opacity" :options="opacityOptions" @change="maskUpdateOpacity($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>{{ $t('GENERAL.THICKNESS') }}</b-td>
                  <b-td>
                    <RangeBar :value="maskSettings.thickness" :options="thicknessOptions" @change="maskUpdateThickness($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white bt-0" rowspan="2">{{ $t('DIALOG_BOX.READING_RULER') }}</b-th>
                  <b-td>{{ $t('GENERAL.OPACITY') }}</b-td>
                  <b-td>
                    <RangeBar :value="rulerSettings.opacity" :options="opacityOptions" @change="rulerUpdateOpacity($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>{{ $t('GENERAL.THICKNESS') }}</b-td>
                  <b-td>
                    <RangeBar :value="rulerSettings.thickness" :options="thicknessOptions" @change="rulerUpdateThickness($event)" />
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-sidebar>
        </div>
      </div>

      <AdaptContainer :adapt-html-element-async="adaptHtmlElementAsyncFn()" :settings="settings" :content-to-adapt="docHtml" />
    </div>
    <div id="ruler-add-in" ref="ruler"></div>
    <div id="mask-add-in" ref="mask">
      <div id="before-reading-zone" ref="maskBeforeReadingZone"></div>
      <div id="mask-reading-zone" ref="maskReadingZone"></div>
      <div id="after-reading-zone" ref="maskAfterReadingZone"></div>
    </div>
  </div>
</template>

<style scoped>
#ruler-add-in {
  position: absolute;
  display: none;
  z-index: 3;
  width: 100%;
  border-top: 1px solid #00000033;
}
.showruler #ruler-add-in {
  display: block;
  cursor: vertical-text;
}
#mask-add-in {
  position: absolute;
  flex-direction: column;
  top: 50px;
  left: 0;
  display: none;
  z-index: 3;
  width: 100%;
}

#before-reading-zone,
#after-reading-zone {
  background: #20202033;
}

#after-reading-zone {
  flex-grow: 2;
}

#mask-reading-zone {
  width: 100%;
  height: 25px;
}
.showmask #mask-add-in {
  display: flex;
  cursor: vertical-text;
}

@media print {
  .btn {
    visibility: hidden !important;
  }

  .top-bar {
    visibility: hidden !important;
  }
}

.top-bar {
  z-index: 4;
  background-color: white;
}
</style>
