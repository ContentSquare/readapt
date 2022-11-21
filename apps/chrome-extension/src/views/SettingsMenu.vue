<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { BCol, BNav, BNavItem, BRow } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { AdaptContainer, CloseSettings, PreviewContainer, SaveSettings } from '@readapt/shared-components'
import { adaptHtmlElementAsyncFn } from '@/visualEngine/adaptHtmlElementAsync'
import { ColoredOption, Language, Settings, SettingsKey } from '@readapt/settings'

import { store, getStateFromLocalStorage } from '@/store'
import router from '@/router'
import utils from '@/chrome'
import SettingsMenuGeneral from '@/views/SettingsMenuGeneral.vue'
import SettingsMenuTableItems from '@/views/SettingsMenuTableItems.vue'

type TabName = 'GENERAL' | 'LETTERS' | 'PHONEMES'

const SettingsMenu = defineComponent({
  components: {
    BRow,
    BCol,
    BNav,
    BNavItem,
    SettingsMenuGeneral,
    SettingsMenuTableItems,
    PreviewContainer,
    AdaptContainer,
    SaveSettings,
    CloseSettings
  },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const textPreview = computed(() => store.getters.getTextPreview)

    const activeTab = ref<TabName>('GENERAL')

    const activateTab = (tabName: TabName) => {
      activeTab.value = tabName
    }

    const settingsFile = computed(() => {
      const settingsFile = encodeURIComponent(JSON.stringify(settings.value, null, 2))
      return `data:application/json;charset=utf-8,${settingsFile}`
    })

    const { closeCurrentTab, getStoredSettings, saveSettings } = utils

    const storedSettings = ref<Settings>()
    const isSettingsDirty = computed(() => !isEqual(storedSettings?.value, settings.value))

    onMounted(async () => {
      storedSettings.value = await getStoredSettings()
      if (router.currentRoute.query.newSettings === 'true') {
        store.commit('newSettings')
      }
    })

    const save = () => {
      saveSettings(settings.value)
      storedSettings.value = settings.value
    }
    const close = async () => {
      store.commit('resetState', getStateFromLocalStorage())
      await closeCurrentTab()
    }

    const contentToAdapt = ref(textPreview.value)
    watch(textPreview, () => (contentToAdapt.value = textPreview.value))

    const updateTextToAdapt = (value: string) => (contentToAdapt.value = value)

    const letterOptions = computed<ColoredOption[]>(() => store.getters.getLetterOptions)
    const phonemeOptions = computed<ColoredOption[]>(() => store.getters.getPhonemeOptions)

    const updateOption = (key: SettingsKey, value: unknown) => store.commit('updateOption', { key, value })
    const changeLanguage = (language: Language) => store.commit('changeLanguage', language)

    return {
      activeTab,
      settings,
      settingsFile,
      contentToAdapt,
      isSettingsDirty,
      letterOptions,
      phonemeOptions,
      activateTab,
      updateTextToAdapt,
      save,
      close,
      adaptHtmlElementAsyncFn,
      changeLanguage,
      updateOption
    }
  }
})
export default SettingsMenu
</script>

<template>
  <div class="container-fluid">
    <div class="mt-3">
      <div>
        <span class="h2">{{ $t('SETTINGS.MY_PREFERENCES') }}</span>
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
          :options="phonemeOptions"
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
          :options="letterOptions"
          @update-items="updateOption('letters', $event)"
          @update-active="updateOption('lettersActive', $event)"
        ></SettingsMenuTableItems>
      </b-col>
      <b-col lg="4">
        <div class="d-flex flex-column align-content-between h-100">
          <h3>{{ $t('SETTINGS.TEXT_PREVIEW') }}</h3>
          <PreviewContainer class="preview-container" :content-to-adapt="contentToAdapt" @update="updateTextToAdapt">
            <AdaptContainer
              :adapt-html-element-async="adaptHtmlElementAsyncFn()"
              :content-to-adapt="$sanitize('<p>' + contentToAdapt + '</p>')"
              :settings="settings"
            />
          </PreviewContainer>

          <div class="mt-3 d-flex justify-content-between">
            <SaveSettings @save-settings="save" />
            <CloseSettings :is-settings-dirty="isSettingsDirty" @close-settings="close" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
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
