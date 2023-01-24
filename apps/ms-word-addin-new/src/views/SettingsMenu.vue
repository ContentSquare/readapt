<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { BCol, BNav, BNavItem, BRow } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { AdaptContainer, CloseSettings, PreviewContainer, SaveSettings } from '@readapt/shared-components'
import { adaptHtmlElementAsyncFn } from '@/visualEngine/adaptHtmlElementAsync'
import { ColoredOption, Language, SettingsKey } from '@readapt/settings'

import store, { loadStoredSettings, getStateFromLocalStorage, saveSettings } from '@/store'
import router from '@/router'

import SettingsMenuGeneral from './SettingsMenuGeneral.vue'
import SettingsMenuTableItems from './SettingsMenuTableItems.vue'

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

    const storedSettings = ref(loadStoredSettings())
    const isSettingsDirty = computed(() => !isEqual(storedSettings.value, settings.value))
    const save = () => {
      saveSettings(settings.value)
      storedSettings.value = settings.value
    }
    const close = () => {
      store.commit('resetState', getStateFromLocalStorage())
      router.push({ path: '/' })
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
  <div class="container-fluid" style="height: 100vh">
    <b-nav id="nav" class="d-flex flex-row">
      <b-nav-item @click="activateTab('GENERAL')" :active="activeTab === 'GENERAL'">{{ $t('SETTINGS.GENERAL_SETTINGS') }}</b-nav-item>
      <b-nav-item @click="activateTab('PHONEMES')" :active="activeTab === 'PHONEMES'">{{ $t('SETTINGS.PHONEME_SETTINGS') }}</b-nav-item>
      <b-nav-item @click="activateTab('LETTERS')" :active="activeTab === 'LETTERS'">{{ $t('SETTINGS.LETTER_SETTINGS') }}</b-nav-item>
    </b-nav>

    <b-row class="container-fluid-content">
      <b-col lg="12">
        <div class="my-3">
          <SettingsMenuGeneral
            v-if="activeTab === 'GENERAL'"
            class="my-3 settings-tab"
            :settings="settings"
            @update="updateOption($event.key, $event.value)"
            @change-language="changeLanguage($event)"
          ></SettingsMenuGeneral>
          <SettingsMenuTableItems
            v-if="activeTab === 'PHONEMES'"
            class="my-3 settings-tab"
            table-label="SETTINGS.PHONEME_AND_EXAMPLE"
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
            class="my-3 settings-tab"
            table-label="SETTINGS.LETTER_AND_EXAMPLE"
            switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
            :all-items-active="settings.lettersActive"
            :items="settings.letters"
            :options="letterOptions"
            @update-items="updateOption('letters', $event)"
            @update-active="updateOption('lettersActive', $event)"
          ></SettingsMenuTableItems>
        </div>
      </b-col>
      <b-col lg="12" style="max-height: 32vh">
        <PreviewContainer class="preview-container mb-auto" :content-to-adapt="contentToAdapt" @update="updateTextToAdapt">
          <AdaptContainer
            :adapt-html-element-async="adaptHtmlElementAsyncFn()"
            :content-to-adapt="$sanitize('<p>' + contentToAdapt + '</p>')"
            :settings="settings"
          />
        </PreviewContainer>
      </b-col>
    </b-row>

    <div>
      <div class="mt-3 mb-3 d-flex justify-content-between">
        <SaveSettings @save-settings="save" />
        <CloseSettings :is-settings-dirty="isSettingsDirty" @close-settings="close" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-fluid {
  display: flex;
  flex-direction: column;

  .container-fluid-content {
    flex: 1;
    overflow: scroll;
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

.settings-tab {
  max-height: 60vh;
  height: 60vh;
}

.preview-container {
  height: 22vh;
  max-height: 22vh;
  overflow-y: auto;
}
</style>
