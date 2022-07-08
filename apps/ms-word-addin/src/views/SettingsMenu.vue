<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { BCol, BRow } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { Settings } from '@readapt/settings'
import { AdaptContainer, CloseSettings, PreviewContainer, SaveSettings } from '@readapt/shared-components'
import { adaptHtmlElementAsyncFn } from '@/visualEngine/adaptHtmlElementAsync'

import routes from '../router'
import store, { loadStoredSettings } from '@/store'

const SettingsMenu = defineComponent({
  components: {
    BRow,
    BCol,
    PreviewContainer,
    AdaptContainer,
    SaveSettings,
    CloseSettings
  },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const textPreview = computed(() => store.getters.getTextPreview)

    const storedSettings = ref(loadStoredSettings())
    const isSettingsDirty = computed(() => !isEqual(storedSettings.value, settings.value))
    const saveSettings = async () => {
      await store.dispatch('saveSettings')
      storedSettings.value = loadStoredSettings() as Settings
    }
    const closeSettings = () => {
      store.dispatch('loadSavedSettings')
      routes.push({ path: '/' })
    }

    const contentToAdapt = ref(textPreview.value)
    watch(textPreview, () => (contentToAdapt.value = textPreview.value))

    const updateTextToAdapt = (value: string) => (contentToAdapt.value = value)

    return { settings, contentToAdapt, isSettingsDirty, saveSettings, updateTextToAdapt, closeSettings, adaptHtmlElementAsyncFn }
  }
})
export default SettingsMenu
</script>

<template>
  <div class="container-fluid" style="min-height: 100vh">
    <nav id="nav" class="d-flex flex-row" style="max-height: 8vh">
      <router-link class="p-3" to="/settings/general">{{ $t('SETTINGS.GENERAL_SETTINGS') }}</router-link>
      <router-link class="p-3" to="/settings/phonemes">{{ $t('SETTINGS.PHONEME_SETTINGS') }}</router-link>
      <router-link class="p-3" to="/settings/letters">{{ $t('SETTINGS.LETTER_SETTINGS') }}</router-link>
    </nav>

    <b-row style="max-height: 92vh">
      <b-col lg="12">
        <router-view class="my-3" style="max-height: 60vh; height: 60vh" />
      </b-col>
      <b-col lg="12" style="max-height: 32vh">
        <PreviewContainer class="preview-container mb-auto" :content-to-adapt="contentToAdapt" @update="updateTextToAdapt">
          <AdaptContainer
            :adapt-html-element-async="adaptHtmlElementAsyncFn()"
            :content-to-adapt="$sanitize('<p>' + contentToAdapt + '</p>')"
            :settings="settings"
          />
        </PreviewContainer>

        <div style="max-height: 8vh">
          <div class="mt-3 d-flex justify-content-between">
            <SaveSettings @save-settings="saveSettings" />
            <CloseSettings :is-settings-dirty="isSettingsDirty" @close-settings="closeSettings" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
#nav {
  a {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.48);
    font-size: 15px;
    border-bottom: 1px solid #d1d6df;

    &.router-link-active {
      color: var(--blue);
      border-bottom: 2px solid var(--blue);
    }
  }
  a:hover {
    text-decoration-line: none;
  }
}

.preview-container {
  height: 22vh;
  max-height: 22vh;
  overflow-y: scroll;
}
</style>
