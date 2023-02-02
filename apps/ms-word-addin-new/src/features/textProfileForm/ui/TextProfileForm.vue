<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Settings, type Language, getLangConfig } from '@readapt/settings'
import BaseTabs from '@/shared/ui/BaseTabs.vue'
import TextProfileFormGeneralTab from './TextProfileFormGeneralTab.vue'
import TextProfileFormItemsTab from './TextProfileFormItemsTab.vue'

type Props = {
  settings: Settings
}
const props = defineProps<Props>()

const { t } = useI18n()
const tabNames = [t('SETTINGS.GENERAL_SETTINGS'), t('SETTINGS.PHONEME_SETTINGS'), t('SETTINGS.LETTER_SETTINGS')]

const activeTabIndex = ref(0)

type Entry = {
  key: string
  value: unknown
}
interface Emits {
  (event: 'update-settings', value: Entry): void
  (event: 'change-language', value: Language): void
}
const emit = defineEmits<Emits>()
const emitUpdateSettings = (event: Entry) => emit('update-settings', event)
const emitChangeLanguage = (language: Language) => emit('change-language', language)

const languageConfig = computed(() => getLangConfig(props.settings.language))
</script>
<template>
  <div>
    <BaseTabs v-model="activeTabIndex" data-test-id="tabs" :names="tabNames" />
    <TextProfileFormGeneralTab
      v-if="activeTabIndex === 0"
      key="general"
      :settings="settings"
      data-test-id="general"
      @update="emitUpdateSettings($event)"
      @change-language="emitChangeLanguage($event)"
    />
    <TextProfileFormItemsTab
      v-if="activeTabIndex === 1"
      key="phonemes"
      :all-items-active="settings.phonemesActive"
      :items="settings.phonemes"
      :options="languageConfig.phonemeOptions"
      table-label="SETTINGS.PHONEME"
      switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
      data-test-id="phonemes"
      @update-items="emitUpdateSettings({ key: 'phonemes', value: $event })"
      @update-active="emitUpdateSettings({ key: 'phonemesActive', value: $event })"
    />
    <TextProfileFormItemsTab
      v-if="activeTabIndex === 2"
      key="letters"
      :all-items-active="settings.lettersActive"
      :items="settings.letters"
      :options="languageConfig.letterOptions"
      table-label="SETTINGS.LETTER"
      switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
      data-test-id="letters"
      @update-items="emitUpdateSettings({ key: 'letters', value: $event })"
      @update-active="emitUpdateSettings({ key: 'lettersActive', value: $event })"
    />
  </div>
</template>
