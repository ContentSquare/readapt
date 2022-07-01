<script lang="ts">
/* global Office */
import { computed, defineComponent, onMounted, ref, unref } from '@vue/composition-api'
import { BButton, BFormCheckbox, BFormSelect, BTableSimple, BTbody, BTr, BTd, BTh, BIconList, BSidebar } from 'bootstrap-vue'

import {
  Settings,
  fontSizeOptions,
  fontFamilyOptions,
  letterSpacingOptions,
  wordSpacingOptions,
  lineSpacingOptions,
  languageOptions,
  thicknessOptions,
  opacityOptions,
  SettingsKey,
  Option
} from '@readapt/settings'
import { SelectPercentage, RangeBar } from '@readapt/shared-components'

import AdaptContainer from '@/components/AdaptContainer.vue'
import store from '@/store'
import i18n from '@/i18n'

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
    const rulerActivated = ref(false)
    const maskActivated = ref(false)

    const heightMask = 25
    const BASE_COLOR = '#000000'

    const opacityMaskSelected = ref<string>(opacityOptions[0].value)
    const opacityRulerSelected = ref<string>(opacityOptions[0].value)
    const heightMaskSelected = ref<string>(thicknessOptions[0].value)
    const heightRulerSelected = ref<string>(thicknessOptions[0].value)

    const settings = computed<Settings>(() => store.getters.getSettings)
    const allItemsLettersActive = computed<boolean>(() => settings.value.lettersActive)
    const allItemsPhonemesActive = computed<boolean>(() => settings.value.phonemesActive)

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

    const docHtml = ref<string>('')

    const onMessage = (event: Office.DialogParentMessageReceivedEventArgs) => {
      try {
        const message = event.message
        const { html, settings, lang } = JSON.parse(message)
        docHtml.value = html
        store.dispatch('updateSettings', settings)
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
          if (ruler.value && rulerActivated.value) {
            ruler.value.style.top = `${event.pageY - 2}px`
          }
          if (maskBeforeReadingZone.value && maskActivated.value) {
            maskBeforeReadingZone.value.style.height = `${event.pageY - topBarZone.value.offsetHeight - 20}px`
          }
        }
      })
    })

    const print = () => {
      window.print()
    }

    const toggleRuler = () => {
      if (maskActivated.value) maskActivated.value = false
      rulerActivated.value = !rulerActivated.value
      document.body.className = rulerActivated.value ? 'showruler' : ''
    }

    const toggleMask = () => {
      if (rulerActivated.value) rulerActivated.value = false
      maskActivated.value = !maskActivated.value
      document.body.className = maskActivated.value ? 'showmask' : ''
    }

    const maskHeightChange = (size: string) => {
      const maskReadingZoneElem = unref(maskReadingZone) as HTMLDivElement
      maskReadingZoneElem.style.height = `${(heightMask * parseInt(size)).toString()}px`
      heightMaskSelected.value = size
    }

    const rulerHeightChange = (size: string) => {
      const rulerElem = unref(ruler) as HTMLDivElement
      rulerElem.style.borderTopWidth = `${size}px`
      heightRulerSelected.value = size
    }

    const updateOption = (key: SettingsKey, value: unknown) => store.dispatch('updateOption', { key, value })

    const updateShadeAlternateLines = async (shadeAlternateLinesActive: string) => {
      await updateOption('shadeAlternateLinesActive', shadeAlternateLinesActive)
      // change lineSpacing value if lineSpacingOptionsOptimized has changed and current value is not selectable
      if (lineSpacingOptionsOptimized.value.length !== lineSpacingOptions.length && settings.value.lineSpacing === lineSpacingOptions[0].value) {
        await store.dispatch('updateOption', { key: 'lineSpacing', value: lineSpacingOptionsOptimized.value[0].value })
      }
    }

    const opacityMaskChange = (opacity: string) => {
      const maskBeforeReadingZoneElem = unref(maskBeforeReadingZone) as HTMLElement
      const maskAfterReadingZoneElem = unref(maskAfterReadingZone) as HTMLElement

      maskBeforeReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
      maskAfterReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
      opacityMaskSelected.value = opacity
    }

    const opacityRulerChange = (opacity: string) => {
      const ruleElem = unref(ruler) as HTMLDivElement

      ruleElem.style.borderColor = BASE_COLOR + opacity
      opacityRulerSelected.value = opacity
    }

    return {
      error,
      settings,
      docHtml,
      print,
      userPlatform,
      toggleRuler,
      toggleMask,
      maskHeightChange,
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
      rulerActivated,
      maskActivated,
      opacityOptions,
      opacityMaskChange,
      opacityMaskSelected,
      opacityRulerChange,
      opacityRulerSelected,
      thicknessOptions,
      heightRulerSelected,
      heightMaskSelected,
      rulerHeightChange,
      topBarZone,
      mask,
      maskBeforeReadingZone,
      maskReadingZone,
      maskAfterReadingZone,
      ruler
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
        <b-form-checkbox :checked="maskActivated" @change="toggleMask()" inline switch>{{ $t('DIALOG_BOX.MASK') }}</b-form-checkbox>
        <b-form-checkbox :checked="rulerActivated" @change="toggleRuler()" inline switch>{{ $t('DIALOG_BOX.RULER') }}</b-form-checkbox>

        <b-button class="float-right" size="sm" v-b-toggle.sidebar-1><b-icon-list font-scale="1.5" /></b-button>
        <div class="px-3 py-2">
          <b-sidebar id="sidebar-1" :title="$t('DIALOG_BOX.QUICK_ACTIVATE')" width="530px" right shadow>
            <b-table-simple striped responsive class="mb-0">
              <b-tbody>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.FONT') }} </b-th>
                  <b-td>
                    <b-form-select :options="fontFamilyOptions" :value="settings.fontFamily" @change="updateOption('fontFamily', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.FONT_SIZE') }} </b-th>
                  <b-td>
                    <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.LETTER_SPACING') }} </b-th>
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
                  <b-th class="bg-white"> {{ $t('GENERAL.WORD_SPACING') }} </b-th>
                  <b-td>
                    <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @change="updateOption('wordSpacing', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.LINE_SPACING') }} </b-th>
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
                  <b-th class="bg-white"> {{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }} </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.syllableActive" @change="updateOption('syllableActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('GENERAL.GREY_SILENT_LETTERS') }} </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.silentLetterActive" @change="updateOption('silentLetterActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('SETTINGS.ALL_PHONEMES_SETTINGS') }} </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="allItemsPhonemesActive" @change="updateOption('phonemesActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white"> {{ $t('SETTINGS.ALL_LETTERS_SETTINGS') }} </b-th>
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
                  <b-th class="bg-white"> {{ $t('GENERAL.SHADE_ALTERNATE_LINES') }} </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.shadeAlternateLinesActive" @change="updateShadeAlternateLines" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white" rowspan="2">{{ $t('DIALOG_BOX.READING_MASK') }}</b-th>
                  <b-td>{{ $t('GENERAL.OPACITY') }}</b-td>
                  <b-td>
                    <RangeBar :value="opacityMaskSelected" :options="opacityOptions" @change="opacityMaskChange($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>{{ $t('GENERAL.THICKNESS') }}</b-td>
                  <b-td>
                    <RangeBar :value="heightMaskSelected" :options="thicknessOptions" @change="maskHeightChange($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white bt-0" rowspan="2">{{ $t('DIALOG_BOX.READING_RULER') }}</b-th>
                  <b-td>{{ $t('GENERAL.OPACITY') }}</b-td>
                  <b-td>
                    <RangeBar :value="opacityRulerSelected" :options="opacityOptions" @change="opacityRulerChange($event)" />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>{{ $t('GENERAL.THICKNESS') }}</b-td>
                  <b-td>
                    <RangeBar :value="heightRulerSelected" :options="thicknessOptions" @change="rulerHeightChange($event)" />
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-sidebar>
        </div>
      </div>

      <AdaptContainer :settings="settings" :content-to-adapt="docHtml" />
    </div>
    <div id="ruler" ref="ruler"></div>
    <div id="mask" ref="mask">
      <div id="before-reading-zone" ref="maskBeforeReadingZone"></div>
      <div id="mask-reading-zone" ref="maskReadingZone"></div>
      <div id="after-reading-zone" ref="maskAfterReadingZone"></div>
    </div>
  </div>
</template>

<style>
#ruler {
  position: absolute;
  display: none;
  z-index: 3;
  width: 100%;
  border-top: 1px solid #00000033;
}
.showruler #ruler {
  display: block;
  cursor: vertical-text;
}
#mask {
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
.showmask #mask {
  display: flex;
  cursor: vertical-text;
}
</style>

<style scoped>
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
