<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BRow, BCol, BSpinner } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { Settings } from '@readapt/settings'
import { CloseSettings, SaveSettings } from '@readapt/shared-components'

import routes from '../router'
import store, { loadStoredSettings } from '@/store'
import AdaptContainer from '@/components/AdaptContainer.vue'

const SettingsMenu = defineComponent({
  components: {
    BRow,
    BCol,
    BSpinner,
    AdaptContainer,
    SaveSettings,
    CloseSettings
  },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const contentToAdapt = computed(() => store.getters.getTextPreview)
    const isLoading = ref(true)

    const onReady = () => {
      isLoading.value = false
    }

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

    return {
      onReady,
      settings,
      contentToAdapt,
      isLoading,
      saveSettings,
      isSettingsDirty,
      closeSettings
    }
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

    <b-row>
      <b-col lg="8" class="mb-2" style="max-height: 60vh; height: 60vh">
        <router-view />
      </b-col>
      <b-col lg="3" class="m-1" style="max-height: 32vh">
        <div v-if="isLoading">
          <div class="d-flex h-100 align-items-center justify-content-center flex-column">
            <b-spinner label="Loading..." variant="primary"></b-spinner>
            <div>{{ $t('LOADING') }}...</div>
          </div>
        </div>
        <div class="text-preview" :class="{ loading: isLoading }">
          <AdaptContainer :settings="settings" :content-to-adapt="contentToAdapt" @ready="onReady" />
        </div>
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
@media (max-width: 768px) {
  .text-preview {
    height: 22vh;
    max-height: 22vh;
    overflow-y: scroll;
  }
}
.loading {
  opacity: 0.5;
  background-color: var(--light);
}
</style>
