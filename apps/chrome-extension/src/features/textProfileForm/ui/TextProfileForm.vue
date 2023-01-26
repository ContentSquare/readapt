<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Settings, type Language, getLangConfig } from '@readapt/settings'
import BaseTabs from '@/shared/ui/BaseTabs.vue'
import TextProfileFormGeneralTab from './TextProfileFormGeneralTab.vue'
import TextProfileFormItemsTab from './TextProfileFormItemsTab.vue'

interface Props {
  settings: Settings
}
const props = defineProps<Props>()

const { t } = useI18n()
const tabNames = [t('SETTINGS.GENERAL_SETTINGS'), t('SETTINGS.PHONEME_SETTINGS'), t('SETTINGS.LETTER_SETTINGS')]

const activeTabIndex = ref(0)

interface Emits {
  (event: 'update-settings', value: unknown): void
  (event: 'set-language', value: Language): void
}
const emit = defineEmits<Emits>()
const emitUpdateSettings = (event: unknown) => emit('update-settings', event)
const emitChangeLanguage = (language: Language) => emit('change-language', language)

const languageConfig = computed(() => getLangConfig(props.settings.language))
</script>
<template>
  <div>
    <BaseTabs data-test-id="tabs" :names="tabNames" v-model="activeTabIndex" />
    <TextProfileFormGeneralTab
      v-if="activeTabIndex === 0"
      :settings="settings"
      @update="emitUpdateSettings($event)"
      @change-language="emitChangeLanguage($event)"
      data-test-id="general"
      key="general"
    />
    <TextProfileFormItemsTab
      v-if="activeTabIndex === 1"
      :all-items-active="settings.phonemesActive"
      :items="settings.phonemes"
      :options="languageConfig.phonemeOptions"
      @update-items="emitUpdateSettings({ key: 'phonemes', value: $event })"
      @update-active="emitUpdateSettings({ key: 'phonemesActive', value: $event })"
      table-label="SETTINGS.PHONEME"
      switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
      data-test-id="phonemes"
      key="phonemes"
    />
    <TextProfileFormItemsTab
      v-if="activeTabIndex === 2"
      :all-items-active="settings.lettersActive"
      :items="settings.letters"
      :options="languageConfig.letterOptions"
      @update-items="emitUpdateSettings({ key: 'letters', value: $event })"
      @update-active="emitUpdateSettings({ key: 'lettersActive', value: $event })"
      table-label="SETTINGS.LETTER"
      switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
      data-test-id="letters"
      key="letters"
    />
  </div>
</template>
