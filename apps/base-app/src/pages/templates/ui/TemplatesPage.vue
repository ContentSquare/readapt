<script lang="ts" setup>
import { ref } from 'vue'
import type { Language } from '@readapt/settings'
import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'
import LanguageSelect from '@shared/ui/LanguageSelect.vue'

import { useTemplatesByLanguage } from '../model/useTemplatesByLanguage'

const language = ref<Language>('en')
const templates = useTemplatesByLanguage(language)

const { closeCurrentTab } = utils
const router = useRouter()
</script>

<template>
  <div class="container-md">
    <div class="mt-2">
      <h2>{{ $t('SELECT_TEMPLATE.PLEASE_SELECT_A_TEMPLATE') }}</h2>
      <p>{{ $t('SELECT_TEMPLATE.CLICK_TO_MODIFY_OR_SELECT_TEMPLATE') }}</p>
    </div>

    <div>
      <LanguageSelect v-model="selectedLanguage" />
      <!-- Create from template component -->
    </div>

    <div class="d-flex justify-content-end mt-2">
      <b-button size="sm" variant="outline-primary" @click="closeCurrentTab(router)">{{ $t('SELECT_TEMPLATE.CANCEL') }}</b-button>
    </div>
  </div>
</template>
