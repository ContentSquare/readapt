<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { BFormCheckbox, BFormSelect, BTableSimple, BTbody, BTd, BTr } from 'bootstrap-vue'

import {
  fontFamilyOptions,
  fontSizeOptions,
  Language,
  languageOptions,
  letterSpacingOptions,
  lineSpacingOptions,
  opacityOptions,
  Option,
  Settings,
  SettingsKey,
  silentLetterOpacityOptions,
  wordSpacingOptions
} from '@readapt/settings'
import { ColorPicker, RangeBar, SelectPercentage } from '@readapt/shared-components'

import store from '@/store'

const SettingsMenuGeneral = defineComponent({
  components: {
    BFormCheckbox,
    BFormSelect,
    BTableSimple,
    BTbody,
    BTr,
    BTd,
    RangeBar,
    SelectPercentage,
    ColorPicker
  },
  setup() {
    const settings = computed<Settings>(() => store.getters.getSettings)

    const lineSpacingOptionsOptimized = computed<Option[]>(() => {
      const { shadeAlternateLinesActive } = settings.value
      return shadeAlternateLinesActive ? lineSpacingOptions.slice(1) : lineSpacingOptions
    })

    const updateOption = (key: SettingsKey, value: unknown) => store.commit('updateOption', { key, value })

    const updateShadeAlternateLines = (shadeAlternateLinesActive: string) => {
      updateOption('shadeAlternateLinesActive', shadeAlternateLinesActive)
      // change lineSpacing value if lineSpacingOptionsOptimized has changed and current value is not selectable
      if (lineSpacingOptionsOptimized.value.length !== lineSpacingOptions.length && settings.value.lineSpacing === lineSpacingOptions[0].value) {
        updateOption('lineSpacing', lineSpacingOptionsOptimized.value[0].value)
      }
    }

    const changeLanguage = (language: Language) => store.commit('changeLanguage', language)

    return {
      settings,
      fontFamilyOptions,
      fontSizeOptions,
      letterSpacingOptions,
      wordSpacingOptions,
      lineSpacingOptionsOptimized,
      languageOptions,
      opacityOptions,
      silentLetterOpacityOptions,
      updateOption,
      updateShadeAlternateLines,
      changeLanguage
    }
  }
})
export default SettingsMenuGeneral
</script>
<template>
  <div>
    <b-table-simple striped sticky-header="60vh" responsive class="mb-0">
      <b-tbody>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.PROFILE_LANGUAGE') }}</div>
            <b-form-select :options="languageOptions" :value="settings.language" @change="changeLanguage($event)" />
          </b-td>
          <b-td class="px-0" />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.FONT') }}</div>
            <b-form-select :options="fontFamilyOptions" :value="settings.fontFamily" @change="updateOption('fontFamily', $event)" />
          </b-td>
          <b-td class="px-0" />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.FONT_SIZE') }}</div>
            <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
          </b-td>
          <b-td />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.LETTER_SPACING') }}</div>
            <SelectPercentage :options="letterSpacingOptions" :value="settings.letterSpacing" @change="updateOption('letterSpacing', $event)" />
          </b-td>
          <b-td class="px-0" />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.WORD_SPACING') }}</div>
            <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @change="updateOption('wordSpacing', $event)" />
          </b-td>
          <b-td class="px-0" />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.LINE_SPACING') }}</div>
            <SelectPercentage :options="lineSpacingOptionsOptimized" :value="settings.lineSpacing" @change="updateOption('lineSpacing', $event)" />
          </b-td>
          <b-td class="px-0" />
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }}</div>
            <div class="d-flex">
              <ColorPicker class="m-1" :value="settings.syllableColor1" @selectColor="updateOption('syllableColor1', $event)" />
              <ColorPicker class="m-1" :value="settings.syllableColor2" @selectColor="updateOption('syllableColor2', $event)" />
            </div>
            <RangeBar :value="settings.syllableOpacity" :options="opacityOptions" @change="updateOption('syllableOpacity', $event)" />
          </b-td>
          <b-td class="d-flex justify-content-end px-0">
            <b-form-checkbox :checked="settings.syllableActive" @change="updateOption('syllableActive', $event)" switch />
          </b-td>
        </b-tr>
        <b-tr v-if="settings.language === 'fr'">
          <b-td>
            <div>{{ $t('GENERAL.SHOW_LIAISONS') }}</div>
            <RangeBar
              :disabled="settings.language === 'en'"
              :value="settings.liaisonsOpacity"
              :options="opacityOptions"
              @change="updateOption('liaisonsOpacity', $event)"
            />
          </b-td>
          <b-td class="d-flex justify-content-end px-0">
            <b-form-checkbox :checked="settings.liaisonsActive" @change="updateOption('liaisonsActive', $event)" switch />
          </b-td>
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.GREY_SILENT_LETTERS') }}</div>
            <RangeBar
              :value="settings.silentLetterOpacity"
              :options="silentLetterOpacityOptions"
              @change="updateOption('silentLetterOpacity', $event)"
            />
          </b-td>
          <b-td class="d-flex justify-content-end px-0">
            <b-form-checkbox :checked="settings.silentLetterActive" @change="updateOption('silentLetterActive', $event)" switch />
          </b-td>
        </b-tr>
        <b-tr>
          <b-td>
            <div>{{ $t('GENERAL.SHADE_ALTERNATE_LINES') }}</div>
            <RangeBar
              :value="settings.shadeAlternateLinesOpacity"
              :options="opacityOptions"
              @change="updateOption('shadeAlternateLinesOpacity', $event)"
            />
          </b-td>
          <b-td class="d-flex justify-content-end px-0">
            <b-form-checkbox :checked="settings.shadeAlternateLinesActive" @change="updateShadeAlternateLines" switch />
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
<style lang="scss" scoped>
td {
  font-size: 15px;
}
</style>
