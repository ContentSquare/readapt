<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BRow, BCol, BSpinner } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'
import store, { loadStoredSettings } from '@/store'
import utils from '@/chrome'

import AdaptContainer from '@/components/AdaptContainer.vue'
import { Settings } from '@readapt/settings'
import { CloseSettings, SaveSettings } from '@readapt/shared-components'

const { closeCurrentTab } = utils

const SettingsMenu = defineComponent({
  components: { BRow, BCol, BSpinner, AdaptContainer, SaveSettings, CloseSettings },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const contentToAdapt = computed(() => store.getters.getTextPreview)
    const isLoading = ref(true)

    const onReady = () => {
      isLoading.value = false
    }

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

    return {
      onReady,
      settings,
      settingsFile,
      contentToAdapt,
      isSettingsDirty,
      isLoading,
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
          <div v-if="isLoading">
            <div class="d-flex align-items-center justify-content-center flex-column">
              <b-spinner label="Loading..." variant="primary"></b-spinner>
              <div>{{ $t('LOADING') }}...</div>
            </div>
          </div>

          <div :class="{ loading: isLoading }" class="mb-auto">
            <AdaptContainer style="max-height: 67vh; overflow-y: scroll" :settings="settings" :content-to-adapt="contentToAdapt" @ready="onReady" />
          </div>

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
.loading {
  opacity: 0.5;
  background-color: var(--light);
}
</style>
