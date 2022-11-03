<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { BButton } from 'bootstrap-vue'

import { adaptHtmlElementAsyncFn } from '@/visualEngine/adaptHtmlElementAsync'
import { decodeSettings, getLangConfig } from '@readapt/settings'
import { AdaptContainer, SaveSettings } from '@readapt/shared-components'
import store, { saveSettings } from '@/store'
import router from '@/router'

const SettingsCodeEdit = defineComponent({
  components: { BButton, AdaptContainer, SaveSettings },
  setup() {
    const code = ref<string>('')

    const settings = computed(() => {
      try {
        return decodeSettings(code.value)
      } catch (e) {
        // wrong code
      }
      return undefined
    })

    const wrongCodeError = computed<boolean>(() => {
      return !!code.value && !settings.value
    })

    const textPreview = computed<string>(() => {
      const lang = settings.value ? settings.value.language : 'en'
      return getLangConfig(lang).textPreview
    })

    const paste = async (): Promise<void> => {
      code.value = await navigator.clipboard.readText()
    }

    const applyCode = (): void => {
      if (settings.value) {
        store.commit('updateSettings', settings.value)
        saveSettings(settings.value)
      }
    }

    const close = (): void => {
      router.push({ path: '/' })
    }

    return {
      textPreview,
      settings,
      code,
      wrongCodeError,
      adaptHtmlElementAsyncFn,
      applyCode,
      close,
      paste
    }
  }
})
export default SettingsCodeEdit
</script>
<template>
  <div class="container-fluid">
    <div class="my-4">
      <h2>{{ $t('SETTINGS_CODE.APPLY_YOUR_SETTINGS_CODE') }}</h2>
    </div>
    <div>
      <textarea class="form-control" rows="3" :placeholder="$t('SETTINGS_CODE.PASTE_YOUR_SETTINGS')" v-model="code"></textarea>
    </div>

    <div class="d-flex flex-column align-content-between h-100">
      <div class="mt-3 d-flex justify-content-between">
        <div class="d-flex" style="gap: 1rem">
          <b-button size="sm" variant="primary" @click="paste()"> {{ $t('SETTINGS_CODE.PASTE') }}</b-button>
          <SaveSettings @save-settings="applyCode()" :disabled="!settings" label="SETTINGS_CODE.APPLY_THIS_SETTINGS" />
        </div>

        <b-button size="sm" variant="outline-primary" @click="close()"> {{ $t('SETTINGS.CLOSE') }}</b-button>
      </div>

      <p v-if="wrongCodeError" class="text-danger my-2">{{ $t('SETTINGS_CODE.WRONG_CODE_ERROR') }}</p>

      <template v-if="settings">
        <h3 class="my-4">{{ $t('SETTINGS.TEXT_PREVIEW') }}</h3>

        <AdaptContainer
          class="settings-code-preview"
          :adapt-html-element-async="adaptHtmlElementAsyncFn()"
          :content-to-adapt="$sanitize('<p>' + textPreview + '</p>')"
          :settings="settings"
          scope="settings-code-preview"
        />
      </template>
    </div>
  </div>
</template>
<style scoped></style>
