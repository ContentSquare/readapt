<script lang="ts" setup>
import { ref, watch } from 'vue'

import {
  fontFamilyOptions,
  fontSizeOptions,
  languageOptions,
  letterSpacingOptions,
  lineSpacingOptions,
  opacityOptions,
  silentLetterOpacityOptions,
  wordSpacingOptions,
  type Option,
  type Settings,
  type SettingsKey,
  type Language,
  type LineSpacingOption
} from '@readapt/settings'
import { ColorPicker, SelectPercentage } from '@readapt/shared-components'
import RangeBar from '@/shared/ui/RangeBar.vue'
import BaseSelect from '@/shared/ui/BaseSelect.vue'

interface Props {
  settings: Settings
}
const props = defineProps<Props>()

interface Emits {
  (event: 'change-language', language: Language)
  (event: 'update', value: { key: string; value: unknown })
}
const emit = defineEmits<Emits>()

const updateOption = (key: SettingsKey, value: unknown) => emit('update', { key, value })
const changeLanguage = (language: Language) => emit('change-language', language)

const optimizeLineSpacingOptions = (): Option<LineSpacingOption>[] =>
  props.settings.shadeAlternateLinesActive ? lineSpacingOptions.slice(1) : lineSpacingOptions

const lineSpacingOptionsOptimized = ref<Option<LineSpacingOption>[]>(optimizeLineSpacingOptions())

watch(
  () => props.settings.shadeAlternateLinesActive,
  () => {
    lineSpacingOptionsOptimized.value = optimizeLineSpacingOptions()
    // change lineSpacing value if lineSpacingOptionsOptimized has changed and current value is not selectable
    if (lineSpacingOptionsOptimized.value.length !== lineSpacingOptions.length && props.settings.lineSpacing === lineSpacingOptions[0].value) {
      updateOption('lineSpacing', lineSpacingOptionsOptimized.value[0].value)
    }
  }
)
</script>
<template>
  <table class="table w-full">
    <thead>
      <tr>
        <th />
        <th />
        <th>{{ $t('GENERAL.SETTING') }}</th>
        <th>{{ $t('GENERAL.OPACITY') }}</th>
        <th>{{ $t('GENERAL.ACTIVATE') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th class="bg-white">{{ $t('GENERAL.PROFILE_LANGUAGE') }}</th>
        <th />
        <td>
          <BaseSelect :options="languageOptions" :value="settings.language" @input="changeLanguage($event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <th rowspan="2" class="bg-white">
          {{ $t('GENERAL.FONT_SETTINGS') }}
        </th>
        <td>{{ $t('GENERAL.FONT') }}</td>
        <td>
          <BaseSelect :options="fontFamilyOptions" :value="settings.fontFamily" @input="updateOption('fontFamily', $event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.FONT_SIZE') }}</td>
        <td>
          <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <th rowspan="3" class="bg-white">
          {{ $t('GENERAL.SPACING') }}
        </th>
        <td>{{ $t('GENERAL.LETTER_SPACING') }}</td>
        <td>
          <SelectPercentage :options="letterSpacingOptions" :value="settings.letterSpacing" @change="updateOption('letterSpacing', $event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.WORD_SPACING') }}</td>
        <td>
          <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @change="updateOption('wordSpacing', $event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.LINE_SPACING') }}</td>
        <td>
          <SelectPercentage :options="lineSpacingOptionsOptimized" :value="settings.lineSpacing" @change="updateOption('lineSpacing', $event)" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <th :rowspan="settings.language === 'fr' ? 3 : 2" class="bg-white">
          {{ $t('GENERAL.TEXT_HINTS') }}
        </th>
        <td>{{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }}</td>
        <td>
          <div class="flex content-center">
            <ColorPicker class="m-1" :value="settings.syllableColor1" @selectColor="updateOption('syllableColor1', $event)" />
            <ColorPicker class="m-1" :value="settings.syllableColor2" @selectColor="updateOption('syllableColor2', $event)" />
          </div>
        </td>
        <td>
          <RangeBar :value="settings.syllableOpacity" :options="opacityOptions" @input="updateOption('syllableOpacity', $event)" />
        </td>
        <td>
          <input type="checkbox" :checked="settings.syllableActive" @change="updateOption('syllableActive', $event)" switch />
        </td>
      </tr>
      <tr v-if="settings.language === 'fr'">
        <td>{{ $t('GENERAL.SHOW_LIAISONS') }}</td>
        <td />
        <td>
          <RangeBar
            :disabled="settings.language === 'en'"
            :value="settings.liaisonsOpacity"
            :options="opacityOptions"
            @input="updateOption('liaisonsOpacity', $event)"
          />
        </td>
        <td>
          <input type="checkbox" :checked="settings.liaisonsActive" @change="updateOption('liaisonsActive', $event)" switch />
        </td>
      </tr>
      <tr>
        <td>{{ $t('GENERAL.GREY_SILENT_LETTERS') }}</td>
        <td />
        <td>
          <RangeBar
            :value="settings.silentLetterOpacity"
            :options="silentLetterOpacityOptions"
            @input="updateOption('silentLetterOpacity', $event)"
          />
        </td>
        <td>
          <input type="checkbox" :checked="settings.silentLetterActive" @change="updateOption('silentLetterActive', $event)" switch />
        </td>
      </tr>
      <tr>
        <th class="bg-white">{{ $t('GENERAL.READING_TOOLS') }}</th>
        <td>{{ $t('GENERAL.SHADE_ALTERNATE_LINES') }}</td>
        <td />
        <td>
          <RangeBar
            :value="settings.shadeAlternateLinesOpacity"
            :options="opacityOptions"
            @change="updateOption('shadeAlternateLinesOpacity', $event)"
          />
        </td>
        <td>
          <input type="checkbox" :checked="settings.shadeAlternateLinesActive" @change="updateOption('shadeAlternateLinesActive', $event)" switch />
        </td>
      </tr>
    </tbody>
  </table>
</template>
