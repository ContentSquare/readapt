<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue'

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
import { ColorPicker } from '@readapt/shared-components'
import RangeBar from '@/shared/ui/RangeBar.vue'
import BaseSelect from '@/shared/ui/BaseSelect.vue'
import SelectPercentage from '@/shared/ui/SelectPercentage.vue'

interface Props {
  settings: Settings
}
const props = defineProps<Props>()

interface Emits {
  (event: 'change-language', language: Language)
  (event: 'update', value: { key: string; value: unknown })
}
const emit = defineEmits<Emits>()

const emitUpdate = ({ key, value }: { key: SettingsKey; value: unknown }) => emit('update', { key, value })
const emitUpdateToggled = ({ key }: { key: SettingsKey }) => {
  emit('update', { key, value: !props.settings[key] })
}
const changeLanguage = (language: Language) => emit('change-language', language)

watchEffect(() => {
  console.log(JSON.stringify(props.settings, undefined, 2))
})

const optimizeLineSpacingOptions = (): Option<LineSpacingOption>[] =>
  props.settings.shadeAlternateLinesActive ? lineSpacingOptions.slice(1) : lineSpacingOptions

const lineSpacingOptionsOptimized = ref<Option<LineSpacingOption>[]>(optimizeLineSpacingOptions())

watch(
  () => props.settings.shadeAlternateLinesActive,
  () => {
    lineSpacingOptionsOptimized.value = optimizeLineSpacingOptions()
    // change lineSpacing value if lineSpacingOptionsOptimized has changed and current value is not selectable
    if (lineSpacingOptionsOptimized.value.length !== lineSpacingOptions.length && props.settings.lineSpacing === lineSpacingOptions[0].value) {
      emitUpdate({ key: 'lineSpacing', value: lineSpacingOptionsOptimized.value[0].value })
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
          <BaseSelect
            class="select-secondary select select-sm w-full"
            :options="languageOptions"
            :value="settings.language"
            @input="changeLanguage($event)"
          />
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
          <BaseSelect
            class="select-secondary select select-sm w-full"
            :options="fontFamilyOptions"
            :value="settings.fontFamily"
            @input="emitUpdate({ key: 'fontFamily', value: $event })"
          />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.FONT_SIZE') }}</td>
        <td>
          <SelectPercentage
            class="w-full"
            :options="fontSizeOptions"
            :value="settings.fontSize"
            @input="emitUpdate({ key: 'fontSize', value: $event })"
          />
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
          <SelectPercentage
            :options="letterSpacingOptions"
            :value="settings.letterSpacing"
            @input="emitUpdate({ key: 'letterSpacing', value: $event })"
          />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.WORD_SPACING') }}</td>
        <td>
          <SelectPercentage :options="wordSpacingOptions" :value="settings.wordSpacing" @input="emitUpdate({ key: 'wordSpacing', value: $event })" />
        </td>
        <td />
        <td />
      </tr>
      <tr>
        <td>{{ $t('GENERAL.LINE_SPACING') }}</td>
        <td>
          <SelectPercentage
            :options="lineSpacingOptionsOptimized"
            :value="settings.lineSpacing"
            @input="emitUpdate({ key: 'lineSpacing', value: $event })"
          />
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
            <ColorPicker class="m-1" :value="settings.syllableColor1" @selectColor="emitUpdate({ key: 'syllableColor1', value: $event })" />
            <ColorPicker class="m-1" :value="settings.syllableColor2" @selectColor="emitUpdate({ key: 'syllableColor2', value: $event })" />
          </div>
        </td>
        <td>
          <RangeBar :value="settings.syllableOpacity" :options="opacityOptions" @input="emitUpdate({ key: 'syllableOpacity', value: $event })" />
        </td>
        <td>
          <input type="checkbox" class="toggle" :checked="settings.syllableActive" @input="emitUpdateToggled({ key: 'syllableActive' })" />
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
            @input="emitUpdate({ key: 'liaisonsOpacity', value: $event })"
          />
        </td>
        <td>
          <input type="checkbox" class="toggle" :checked="settings.liaisonsActive" @input="emitUpdateToggled({ key: 'liaisonsActive' })" />
        </td>
      </tr>
      <tr>
        <td>{{ $t('GENERAL.GREY_SILENT_LETTERS') }}</td>
        <td />
        <td>
          <RangeBar
            :value="settings.silentLetterOpacity"
            :options="silentLetterOpacityOptions"
            @input="emitUpdate({ key: 'silentLetterOpacity', value: $event })"
          />
        </td>
        <td>
          <input type="checkbox" class="toggle" :checked="settings.silentLetterActive" @input="emitUpdateToggled({ key: 'silentLetterActive' })" />
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
            @input="emitUpdate({ key: 'shadeAlternateLinesOpacity', value: $event })"
          />
        </td>
        <td>
          <input
            type="checkbox"
            class="toggle"
            :checked="settings.shadeAlternateLinesActive"
            @input="emitUpdateToggled({ key: 'shadeAlternateLinesActive' })"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
