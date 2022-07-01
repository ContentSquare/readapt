<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BRow, BCol } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { Settings } from '@readapt/settings'
import { CloseSettings, SaveSettings } from '@readapt/shared-components'

import routes from '../router'
import store, { loadStoredSettings } from '@/store'
import PreviewContainer from '@/components/PreviewContainer.vue'

const SettingsMenu = defineComponent({
  components: {
    BRow,
    BCol,
    PreviewContainer,
    SaveSettings,
    CloseSettings
  },
  setup() {
    const settings = computed(() => store.getters.getSettings)
    const contentToAdapt = computed(() => store.getters.getTextPreview)

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

    return { settings, contentToAdapt, saveSettings, isSettingsDirty, closeSettings }
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
        <PreviewContainer class="text-preview" :settings="settings" :content-to-adapt="contentToAdapt" />

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
</style>
