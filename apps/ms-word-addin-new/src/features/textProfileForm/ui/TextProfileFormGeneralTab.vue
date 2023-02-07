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
import ColorPicker from '@/shared/ui/ColorPicker.vue'
import RangeBar from '@/shared/ui/RangeBar.vue'
import BaseSelect from '@/shared/ui/BaseSelect.vue'
import SelectPercentage from '@/shared/ui/SelectPercentage.vue'

// TODO: create a local settings object, kept in sync with props.settings
// and use v-model to update the local settings object
type Props = {
  settings: Settings
}
const props = defineProps<Props>()

interface Emits {
  (event: 'change-language', language: Language): void
  (event: 'update', value: { key: string; value: unknown }): void
}
const emit = defineEmits<Emits>()

const emitUpdate = ({ key, value }: { key: SettingsKey; value: unknown }) => emit('update', { key, value })
const emitUpdateToggled = ({ key }: { key: SettingsKey }) => {
  emit('update', { key, value: !props.settings[key] })
}
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
      emitUpdate({ key: 'lineSpacing', value: lineSpacingOptionsOptimized.value[0].value })
    }
  }
)
</script>
<template>
  <div class="overflow-scroll">
    <table class="table-zebra table w-full">
      <tbody>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.PROFILE_LANGUAGE') }}</div>
            <BaseSelect
              class="select-secondary select select-sm block w-full"
              :options="languageOptions"
              :model-value="settings.language"
              @update:model-value="changeLanguage($event as Language)"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.FONT') }}</div>
            <BaseSelect
              class="select-secondary select select-sm block w-full"
              :options="fontFamilyOptions"
              :model-value="settings.fontFamily"
              @update:model-value="emitUpdate({ key: 'fontFamily', value: $event })"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.FONT_SIZE') }}</div>
            <SelectPercentage
              class="w-full"
              :options="fontSizeOptions"
              :model-value="settings.fontSize"
              @update:model-value="emitUpdate({ key: 'fontSize', value: $event })"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.LETTER_SPACING') }}</div>
            <SelectPercentage
              :options="letterSpacingOptions"
              :model-value="settings.letterSpacing"
              @update:model-value="emitUpdate({ key: 'letterSpacing', value: $event })"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.WORD_SPACING') }}</div>
            <SelectPercentage
              :options="wordSpacingOptions"
              :model-value="settings.wordSpacing"
              @update:model-value="emitUpdate({ key: 'wordSpacing', value: $event })"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.WORD_SPACING') }}</div>
            <SelectPercentage
              :options="lineSpacingOptionsOptimized"
              :model-value="settings.lineSpacing"
              @update:model-value="emitUpdate({ key: 'lineSpacing', value: $event })"
            />
          </td>
          <td />
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.HIGHLIGHT_ALTERNATING_SYLLABLES') }}</div>
            <div class="mb-2 flex">
              <ColorPicker
                class="m-1"
                :model-value="(settings.syllableColor1 as string)"
                @select-color="emitUpdate({ key: 'syllableColor1', value: $event })"
              />
              <ColorPicker
                class="m-1"
                :model-value="(settings.syllableColor2 as string)"
                @select-color="emitUpdate({ key: 'syllableColor2', value: $event })"
              />
            </div>

            <RangeBar
              :model-value="settings.syllableOpacity"
              :options="opacityOptions"
              @update:model-value="emitUpdate({ key: 'syllableOpacity', value: $event })"
            />
          </td>
          <td>
            <input
              type="checkbox"
              class="toggle toggle-sm"
              :checked="settings.syllableActive"
              @input="emitUpdateToggled({ key: 'syllableActive' })"
            />
          </td>
        </tr>
        <tr v-if="settings.language === 'fr'">
          <td>
            <div class="mb-2">{{ $t('GENERAL.SHOW_LIAISONS') }}</div>
            <RangeBar
              class=""
              :disabled="settings.language === ('en' as Language)"
              :model-value="settings.liaisonsOpacity"
              :options="opacityOptions"
              @update:model-value="emitUpdate({ key: 'liaisonsOpacity', value: $event })"
            />
          </td>
          <td>
            <input
              type="checkbox"
              class="toggle toggle-sm"
              :checked="settings.liaisonsActive"
              @input="emitUpdateToggled({ key: 'liaisonsActive' })"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.GREY_SILENT_LETTERS') }}</div>
            <RangeBar
              :model-value="settings.silentLetterOpacity"
              :options="silentLetterOpacityOptions"
              @update:model-value="emitUpdate({ key: 'silentLetterOpacity', value: $event })"
            />
          </td>
          <td>
            <input
              type="checkbox"
              class="toggle toggle-sm"
              :checked="settings.silentLetterActive"
              @input="emitUpdateToggled({ key: 'silentLetterActive' })"
            />
          </td>
        </tr>
        <tr>
          <td>
            <div class="mb-2">{{ $t('GENERAL.SHADE_ALTERNATE_LINES') }}</div>
            <RangeBar
              :model-value="settings.shadeAlternateLinesOpacity"
              :options="opacityOptions"
              @update:model-value="emitUpdate({ key: 'shadeAlternateLinesOpacity', value: $event })"
            />
          </td>
          <td>
            <input
              type="checkbox"
              class="toggle toggle-sm"
              :checked="settings.shadeAlternateLinesActive"
              @input="emitUpdateToggled({ key: 'shadeAlternateLinesActive' })"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
