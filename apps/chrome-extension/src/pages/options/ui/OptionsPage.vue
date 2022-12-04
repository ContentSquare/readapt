<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n-composable'

import { BCol, BNav, BNavItem, BRow } from 'bootstrap-vue'

import { CloseSettings } from '@readapt/shared-components'
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { TextProfileEditDropdown } from '@/features/textProfileEditDropdown'
import { TextProfileSaveButton } from '@/features/textProfileSaveButton'
import { TextAdaptationPreview } from '@/features/textAdaptationPreview'
import { useFormSettings } from '../model/useFormSettings'
import { useLanguage } from '../model/useLanguage'
import { TextSettings } from '@/entities/textPreferences'

import SettingsMenuGeneral from '@/views/SettingsMenuGeneral.vue'
import SettingsMenuTableItems from '@/views/SettingsMenuTableItems.vue'
import { TextSettingsFileDownload } from '@/features/textSettingsFileDownload'

import utils from '@/chrome'
import router from '@/router'

const selectedProfiledId = ref<TextProfileId | null>(null)
onMounted(() => {
  if ('editActiveProfile' in router.currentRoute.query) {
    selectedProfiledId.value = preferences.activeProfileId
  }
})

const { language, languageConfig, setLanguage } = useLanguage()

const { getProfileById, preferences } = useTextPreferences()
const baseSettings = ref<TextSettings>()
watchEffect(() => {
  if (selectedProfiledId.value) {
    baseSettings.value = getProfileById(selectedProfiledId.value).settings
    setLanguage(baseSettings.value.language)
  } else {
    baseSettings.value = null
    setLanguage('en')
  }
})

const { settings, updateSettings } = useFormSettings(language, baseSettings)

type TabName = 'GENERAL' | 'LETTERS' | 'PHONEMES'
const activeTab = ref<TabName>('GENERAL')
const activateTab = (tabName: TabName) => (activeTab.value = tabName)

const close = async () => await utils.closeCurrentTab()

const { t } = useI18n()
</script>
<template>
  <div class="container-fluid">
    <div class="mt-3">
      <div class="mb-2">
        <h2 class="options-page__title mr-2">Profile:</h2>
        <TextProfileEditDropdown class="options-page__profiles-dropdown" v-model="selectedProfiledId" />
        <TextSettingsFileDownload class="ml-2 float-right" :settings="settings" />
      </div>
      <b-nav class="d-flex flex-row">
        <b-nav-item @click="activateTab('GENERAL')" :active="activeTab === 'GENERAL'">{{ t('SETTINGS.GENERAL_SETTINGS') }}</b-nav-item>
        <b-nav-item @click="activateTab('PHONEMES')" :active="activeTab === 'PHONEMES'">{{ t('SETTINGS.PHONEME_SETTINGS') }}</b-nav-item>
        <b-nav-item @click="activateTab('LETTERS')" :active="activeTab === 'LETTERS'">{{ t('SETTINGS.LETTER_SETTINGS') }}</b-nav-item>
      </b-nav>
    </div>
    <b-row class="mt-2" style="max-height: 80vh; height: 80vh">
      <b-col lg="8">
        <SettingsMenuGeneral
          v-if="activeTab === 'GENERAL'"
          :settings="settings"
          @update="updateSettings($event.key, $event.value)"
          @change-language="setLanguage($event)"
        >
        </SettingsMenuGeneral>
        <SettingsMenuTableItems
          v-if="activeTab === 'PHONEMES'"
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
          v-if="activeTab === 'LETTERS'"
          table-label="SETTINGS.LETTER"
          switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
          :all-items-active="settings.lettersActive"
          :items="settings.letters"
          :options="languageConfig.letterOptions"
          @update-items="updateSettings('letters', $event)"
          @update-active="updateSettings('lettersActive', $event)"
        ></SettingsMenuTableItems>
      </b-col>
      <b-col lg="4">
        <div class="d-flex flex-column align-content-between h-100">
          <h3>{{ t('SETTINGS.TEXT_PREVIEW') }}</h3>
          <TextAdaptationPreview class="preview-container" :settings="settings" />

          <div class="mt-3 d-flex justify-content-between">
            <TextProfileSaveButton v-model="selectedProfiledId" :settings="settings" />
            <!-- TODO: review dirty settings calculation -->
            <CloseSettings :is-settings-dirty="false" @close-settings="close" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.options-page {
  &__title {
    display: inline;
  }

  &__profiles-dropdown {
    font-size: 24px;
    width: 200px;
  }
}
.nav-item {
  a {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.48);
    font-size: 15px;
    border-bottom: 1px solid #d1d6df;
    padding: 1rem;

    &.active {
      color: var(--blue);
      border-bottom: 2px solid var(--blue);
    }
  }

  a:hover {
    text-decoration-line: none;
  }
}

.preview-container {
  max-height: 67vh;
  overflow-y: scroll;
}
</style>
