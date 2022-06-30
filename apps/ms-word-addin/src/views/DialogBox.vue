<script lang="ts">
/* global Office */
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api'
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

    let heightMask = 25
    let heightRuler = 1

    let opacityMask = 0.2
    let opacityRuler = 0.2

    const opacityOptions: Option[] = [
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' },
      { value: '4', text: '4' },
      { value: '5', text: '5' }
    ]

    const opacityMaskSelected = ref<string>('1')
    const opacityRulerSelected = ref<string>('1')
    const heightMaskSelected = ref<string>('1')
    const heightRulerSelected = ref<string>('1')

    const settings = computed<Settings>(() => store.getters.getSettings)
    const allItemsLettersActive = computed<boolean>(() => settings.value.lettersActive)
    const allItemsPhonemesActive = computed<boolean>(() => settings.value.phonemesActive)

    const lineSpacingOptionsOptimized = computed<Option[]>(() => {
      const { shadeAlternateLinesActive } = settings.value
      return shadeAlternateLinesActive ? lineSpacingOptions.slice(1) : lineSpacingOptions
    })

    let ruler = document.getElementById('ruler')
    let mask = document.getElementById('mask')
    let maskBeforeReadingZone = document.getElementById('before-readingzone')
    let topBarZone = document.getElementById('topbar')

    const docHtml = ref<string>('')

    const onReady = () => {
      // Setting the default height of the Mask
      const maskReadingZone = document.getElementById('mask-readingzone') as HTMLElement
      maskReadingZone.style.height = `${heightMask}px`
    }

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
      Office.onReady().then((info: { platform: Office.PlatformType }) => {
        Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, onMessage, onRegister)
        userPlatform.value = info.platform
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

    document.body.onmousemove = (event) => {
      if (!ruler) ruler = document.getElementById('ruler') as HTMLElement
      if (!mask) mask = document.getElementById('mask') as HTMLElement
      if (!maskBeforeReadingZone) maskBeforeReadingZone = document.getElementById('before-readingzone') as HTMLElement
      if (!topBarZone) topBarZone = document.getElementById('topbar')
      const heightMax = document.body.scrollHeight
      mask.style.height = `${heightMax.toString()}px`

      if (topBarZone && event.pageY > topBarZone.offsetHeight) {
        if (ruler && rulerActivated.value) {
          ruler.style.top = `${event.pageY - 2}px`
        }
        if (mask && maskActivated.value) {
          // clientY - (top zone height) - (mask height/2)
          maskBeforeReadingZone.style.height = `${event.pageY - topBarZone.offsetHeight - 20}px`
        }
      }
    }

    const maskHeightChange = (size: string) => {
      let maskReadingZone = document.getElementById('mask-readingzone') as HTMLElement
      maskReadingZone.style.height = `${(heightMask * parseInt(size)).toString()}px`
      heightMaskSelected.value = size
    }

    const rulerHeightChange = (size: string) => {
      let ruler = document.getElementById('ruler') as HTMLElement
      ruler.style.borderTop = `${(heightRuler * parseInt(size)).toString()}px solid black`
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

    const opacityMaskChange = (options: number) => {
      let beforeReadingZone = document.getElementById('before-readingzone') as HTMLElement
      let afterReadingZone = document.getElementById('after-readingzone') as HTMLElement

      beforeReadingZone.style.opacity = (opacityMask * options).toString()
      afterReadingZone.style.opacity = (opacityMask * options).toString()
      opacityMaskSelected.value = opacityOptions[options - 1].value
    }

    const opacityRulerChange = (options: number) => {
      let ruler = document.getElementById('ruler') as HTMLElement

      ruler.style.opacity = (opacityRuler * options).toString()
      opacityRulerSelected.value = opacityOptions[options - 1].value
    }

    return {
      error,
      settings,
      docHtml,
      print,
      userPlatform,
      onReady,
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
      rulerHeightChange
    }
  }
})
export default DialogBox
</script>

<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div class="container-fluid">
      <div id="topbar" class="sticky-top top-bar">
        <b-button v-if="userPlatform !== 'Mac'" size="sm" variant="primary" @click="print()" style="margin-right: 10px">{{
          $t('DIALOG_BOX.PRINT')
        }}</b-button>
        <b-form-checkbox :checked="maskActivated" @change="toggleMask()" inline switch>{{ $t('DIALOG_BOX.MASK') }}</b-form-checkbox>
        <b-form-checkbox :checked="rulerActivated" @change="toggleRuler()" inline switch>{{ $t('DIALOG_BOX.RULER') }}</b-form-checkbox>

        <b-button class="float-right" size="sm" v-b-toggle.sidebar-1><b-icon-list font-scale="1.5" /></b-button>
        <div class="px-3 py-2">
          <b-sidebar id="sidebar-1" :title="$t('DIALOG_BOX.QUICK_ACTIVATE')" width="530px" right shadow>
            <b-table-simple striped responsive class="mb-0">
              <b-tbody>
                <b-tr>
                  <b-th rowspan="1" class="bg-white">
                    {{ $t('GENERAL.FONT') }}
                  </b-th>
                  <b-td>
                    <b-form-select :options="fontFamilyOptions" :value="settings.fontFamily" @change="updateOption('fontFamily', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th rowspan="1" class="bg-white">
                    {{ $t('GENERAL.FONT_SIZE') }}
                  </b-th>
                  <b-td>
                    <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.LETTER_SPACING') }}
                  </b-th>
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
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.WORD_SPACING') }}
                  </b-th>
                  <b-td>
                    <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @change="updateOption('wordSpacing', $event)" />
                  </b-td>
                  <b-td />
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.LINE_SPACING') }}
                  </b-th>
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
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }}
                  </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.syllableActive" @change="updateOption('syllableActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.GREY_SILENT_LETTERS') }}
                  </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.silentLetterActive" @change="updateOption('silentLetterActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('SETTINGS.ALL_PHONEMES_SETTINGS') }}
                  </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="allItemsPhonemesActive" @change="updateOption('phonemesActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('SETTINGS.ALL_LETTERS_SETTINGS') }}
                  </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="allItemsLettersActive" @change="updateOption('lettersActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr v-if="settings.language === 'fr'">
                  <b-th :rowspan="1" class="bg-white">{{ $t('GENERAL.SHOW_LIAISONS') }}</b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.liaisonsActive" @change="updateOption('liaisonsActive', $event)" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th :rowspan="1" class="bg-white">
                    {{ $t('GENERAL.SHADE_ALTERNATE_LINES') }}
                  </b-th>
                  <b-td />
                  <b-td class="text-right">
                    <b-form-checkbox :checked="settings.shadeAlternateLinesActive" @change="updateShadeAlternateLines" switch />
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-th class="bg-white" :rowspan="2">{{ $t('DIALOG_BOX.READING_MASK') }}</b-th>
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
                  <b-th :rowspan="2" class="bg-white bt-0">{{ $t('DIALOG_BOX.READING_RULER') }}</b-th>
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

      <AdaptContainer :settings="settings" :content-to-adapt="docHtml" @ready="onReady" />
    </div>
    <div id="ruler"></div>
    <div id="mask">
      <div id="before-readingzone"></div>
      <div id="mask-readingzone"></div>
      <div id="after-readingzone"></div>
    </div>
  </div>
</template>

<style>
#ruler {
  position: absolute;
  display: none;
  z-index: 3;
  width: 100%;
  border-top: 1px solid black;
  opacity: 0.2;
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
#before-readingzone,
#after-readingzone {
  background: #202020;
  opacity: 0.2;
}
#after-readingzone {
  flex-grow: 2;
}
#mask-readingzone {
  width: 100%;
  height: 40px; /* should be equal to line-height or max line height */
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
