<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n-composable'
import { type Settings, getLangConfig } from '@readapt/settings'
import BaseTabs from '@/shared/ui/BaseTabs.vue'
import SettingsMenuGeneral from '@/views/SettingsMenuGeneral.vue'
import SettingsMenuTableItems from '@/views/SettingsMenuTableItems.vue'

interface Props {
  settings: Settings
}
const props = defineProps<Props>()

const { t } = useI18n()
const tabNames = [t('SETTINGS.GENERAL_SETTINGS'), t('SETTINGS.PHONEME_SETTINGS'), t('SETTINGS.LETTER_SETTINGS')]

const activeTabIndex = ref(0)

interface Emits {
  (event: 'change', value: unknown): void
}
const emit = defineEmits<Emits>()
const emitUpdateSettings = (event: unknown) => emit('update-settings', event)

const languageConfig = computed(() => getLangConfig(props.settings.language))
</script>
<template>
  <div>
    <BaseTabs data-test-id="tabs" :names="tabNames" v-model="activeTabIndex" />
    <SettingsMenuGeneral
      v-if="activeTabIndex === 0"
      :settings="settings"
      data-test-id="general"
      @update="emitUpdateSettings($event)"
      @change-language="$emit('change-language', $event)"
    >
    </SettingsMenuGeneral>
    <SettingsMenuTableItems
      v-if="activeTabIndex === 1"
      table-label="SETTINGS.PHONEME"
      switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
      data-test-id="phonemes"
      :all-items-active="settings.phonemesActive"
      :items="settings.phonemes"
      :options="languageConfig.phonemeOptions"
      @update-items="emitUpdateSettings({ key: 'phonemes', value: $event })"
      @update-active="emitUpdateSettings({ key: 'phonemesActive', value: $event })"
    >
    </SettingsMenuTableItems>
    <SettingsMenuTableItems
      v-if="activeTabIndex === 2"
      table-label="SETTINGS.LETTER"
      switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
      data-test-id="letters"
      :all-items-active="settings.lettersActive"
      :items="settings.letters"
      :options="languageConfig.letterOptions"
      @update-items="emitUpdateSettings({ key: 'letters', value: $event })"
      @update-active="emitUpdateSettings({ key: 'lettersActive', value: $event })"
    ></SettingsMenuTableItems>
  </div>
</template>
