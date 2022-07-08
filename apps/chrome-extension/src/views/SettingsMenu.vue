<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { BRow, BCol } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'
import store, { loadStoredSettings } from '@/store'
import utils from '@/chrome'

import AdaptContainer from '@/components/AdaptContainer.vue'
import { Settings } from '@readapt/settings'
import { CloseSettings, SaveSettings, PreviewContainer } from '@readapt/shared-components'

const { closeCurrentTab } = utils

const SettingsMenu = defineComponent({
  components: { BRow, BCol, PreviewContainer, AdaptContainer, SaveSettings, CloseSettings },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const textPreview = computed(() => store.getters.getTextPreview)

    const settingsFile = computed(() => {
      const settingsFile = encodeURIComponent(JSON.stringify(settings.value, null, 2))
      return `data:application/json;charset=utf-8,${settingsFile}`
    })

    const storedSettings = ref(loadStoredSettings())
    const isSettingsDirty = computed(() => !isEqual(storedSettings?.value, settings.value))
    const saveSettings = async () => {
      await store.dispatch('saveSettings')
      storedSettings.value = loadStoredSettings() as Settings
    }
    const closeSettings = () => {
      store.dispatch('loadSavedSettings')
      closeCurrentTab()
    }

    const contentToAdapt = ref(textPreview.value)
    watch(textPreview, () => (contentToAdapt.value = textPreview.value))

    const updateTextToAdapt = (value: string) => (contentToAdapt.value = value)

    return {
      settings,
      settingsFile,
      contentToAdapt,
      isSettingsDirty,
      updateTextToAdapt,
      saveSettings,
      closeSettings
    }
  }
})
export default SettingsMenu
</script>

<template>
  <div class="container-fluid">
    <div class="mt-3" style="max-height: 20vh">
      <div>
        <span class="h2">{{ $t('SETTINGS.MY_PREFERENCES') }}</span>
        <a class="ml-2 float-right" :href="settingsFile" download="settings.json" target="_blank">{{ $t('SETTINGS.DOWNLOAD_SETTINGS') }}</a>
      </div>
      <nav id="nav" class="d-flex flex-row">
        <router-link class="p-3" to="/settings/general">{{ $t('SETTINGS.GENERAL_SETTINGS') }}</router-link>
        <router-link class="p-3" to="/settings/phonemes">{{ $t('SETTINGS.PHONEME_SETTINGS') }}</router-link>
        <router-link class="p-3" to="/settings/letters">{{ $t('SETTINGS.LETTER_SETTINGS') }}</router-link>
      </nav>
    </div>

    <b-row class="mt-2" style="max-height: 80vh; height: 80vh">
      <b-col lg="8"><router-view /></b-col>
      <b-col lg="4">
        <div class="d-flex flex-column align-content-between h-100">
          <h3>{{ $t('SETTINGS.TEXT_PREVIEW') }}</h3>
          <PreviewContainer class="preview-container" :content-to-adapt="contentToAdapt" @update="updateTextToAdapt">
            <AdaptContainer :content-to-adapt="$sanitize('<p>' + contentToAdapt + '</p>')" :settings="settings" />
          </PreviewContainer>

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
  max-height: 67vh;
  overflow-y: scroll;
}
</style>
