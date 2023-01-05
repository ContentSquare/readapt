<script setup lang="ts">
import { toRefs } from 'vue'
import { type Language, type Settings } from '@readapt/settings'

interface Props {
  settings: Settings
  activeIndex: number
}
const props = defineProps<Props>()
const { settings, activeIndex } = toRefs(props)
</script>
<template>
  <div>
    <SettingsMenuGeneral
      v-if="activeIndex === 0"
      :settings="settings"
      @update="updateSettings($event.key, $event.value)"
      @change-language="setLanguage($event)"
    >
    </SettingsMenuGeneral>
    <SettingsMenuTableItems
      v-if="activeIndex === 1"
      table-label="SETTINGS.PHONEME"
      switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
      :all-items-active="settings.phonemesActive"
      :items="settings.phonemes"
      :options="languageConfig.phonemeOptions"
      @update-items="updateSettings('phonemes', $event)"
      @update-active="updateSettings('phonemesActive', $event)"
    >
    </SettingsMenuTableItems>
    <SettingsMenuTableItems
      v-if="activeIndex === 2"
      table-label="SETTINGS.LETTER"
      switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
      :all-items-active="settings.lettersActive"
      :items="settings.letters"
      :options="languageConfig.letterOptions"
      @update-items="updateSettings('letters', $event)"
      @update-active="updateSettings('lettersActive', $event)"
    ></SettingsMenuTableItems>
  </div>
</template>
