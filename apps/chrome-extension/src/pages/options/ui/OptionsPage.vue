<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect, watch } from 'vue'
import isEqual from 'lodash/isEqual'
import { buildDefaultProfiles, getLangConfig } from '@readapt/settings'

import { BCol, BNav, BNavItem, BRow } from 'bootstrap-vue'

import { CloseSettings } from '@readapt/shared-components'
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { TextProfileEditDropdown } from '@/features/textProfileEditDropdown'
import { TextProfileSaveButton } from '@/features/textProfileSaveButton'
import { TextAdaptationPreview } from '@/features/textAdaptationPreview'

import SettingsMenuGeneral from '@/views/SettingsMenuGeneral.vue'
import SettingsMenuTableItems from '@/views/SettingsMenuTableItems.vue'

import { ColoredOption, Language, Settings, SettingsKey } from '@readapt/settings'

import { store } from '@/store'
import utils from '@/chrome'
import router from '@/router'

const selectedProfiledId = ref<TextProfileId | null>(null)
const { getProfileById, preferences } = useTextPreferences()

onMounted(() => {
  if ('editActiveProfile' in router.currentRoute.query) {
    selectedProfiledId.value = parseInt(preferences.activeProfileId)
  }
})

const settings = ref<Settings>()

watchEffect(() => {
  if (selectedProfiledId.value) {
    settings.value = getProfileById(selectedProfiledId.value).settings
  } else {
    settings.value = buildDefaultProfiles()['en']
  }
})

type TabName = 'GENERAL' | 'LETTERS' | 'PHONEMES'

const activeTab = ref<TabName>('GENERAL')

const activateTab = (tabName: TabName) => {
  activeTab.value = tabName
}

const settingsFile = computed(() => {
  const settingsFile = encodeURIComponent(JSON.stringify(settings.value, null, 2))
  return `data:application/json;charset=utf-8,${settingsFile}`
})

const { closeCurrentTab } = utils

const close = async () => {
  await closeCurrentTab()
}

const langConfig = computed(() => getLangConfig(settings.value.language))

const updateOption = (key: SettingsKey, value: unknown) => {
  settings.value = {
    ...settings.value,
    [key]: value
  }
}
const changeLanguage = (language: Language) => {
  // TODO: does the logic belong here?
  settings.value = buildDefaultProfiles()[language]
}
</script>
<template>
  <div class="container-fluid">
    <div class="mt-3">
      <div class="mb-2">
        <h2 class="options-page__title mr-2">Profile:</h2>
        <TextProfileEditDropdown class="options-page__profiles-dropdown" v-model="selectedProfiledId" />
        <a class="ml-2 float-right" :href="settingsFile" download="settings.json" target="_blank">{{ $t('SETTINGS.DOWNLOAD_SETTINGS') }}</a>
      </div>
      <b-nav class="d-flex flex-row">
        <b-nav-item @click="activateTab('GENERAL')" :active="activeTab === 'GENERAL'">{{ $t('SETTINGS.GENERAL_SETTINGS') }}</b-nav-item>
        <b-nav-item @click="activateTab('PHONEMES')" :active="activeTab === 'PHONEMES'">{{ $t('SETTINGS.PHONEME_SETTINGS') }}</b-nav-item>
        <b-nav-item @click="activateTab('LETTERS')" :active="activeTab === 'LETTERS'">{{ $t('SETTINGS.LETTER_SETTINGS') }}</b-nav-item>
      </b-nav>
    </div>
    <b-row class="mt-2" style="max-height: 80vh; height: 80vh">
      <b-col lg="8">
        <SettingsMenuGeneral
          v-if="activeTab === 'GENERAL'"
          :settings="settings"
          @update="updateOption($event.key, $event.value)"
          @change-language="changeLanguage($event)"
        >
        </SettingsMenuGeneral>
        <SettingsMenuTableItems
          v-if="activeTab === 'PHONEMES'"
          table-label="SETTINGS.PHONEME"
          switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
          :all-items-active="settings.phonemesActive"
          :items="settings.phonemes"
          :options="langConfig.phonemeOptions"
          @update-items="updateOption('phonemes', $event)"
          @update-active="updateOption('phonemesActive', $event)"
        >
        </SettingsMenuTableItems>
        <SettingsMenuTableItems
          v-if="activeTab === 'LETTERS'"
          table-label="SETTINGS.LETTER"
          switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
          :all-items-active="settings.lettersActive"
          :items="settings.letters"
          :options="langConfig.letterOptions"
          @update-items="updateOption('letters', $event)"
          @update-active="updateOption('lettersActive', $event)"
        ></SettingsMenuTableItems>
      </b-col>
      <b-col lg="4">
        <div class="d-flex flex-column align-content-between h-100">
          <h3>{{ $t('SETTINGS.TEXT_PREVIEW') }}</h3>
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
