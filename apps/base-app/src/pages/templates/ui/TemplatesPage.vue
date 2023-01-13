<script lang="ts" setup>
import { ref } from 'vue'
import type { Language } from '@readapt/settings'
import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'
import LanguageSelect from '@/shared/ui/LanguageSelect.vue'
import type { TextProfileId } from '@/entities/textPreferences'
import { useTemplatesByLanguage } from '@/entities/textSettingsTemplate'
import { TextProfileCreateFromTemplate } from '@/features/textProfileCreateFromTemplate'

const language = ref<Language>('en')
const templates = useTemplatesByLanguage(language)

const { closeCurrentTab } = utils

const router = useRouter()
const openProfile = (newTextProfileId: TextProfileId) => {
  router.push({ path: 'options?profileId=' + newTextProfileId })
}
</script>

<template>
  <div class="container-md">
    <div class="mt-2">
      <h2>{{ $t('SELECT_TEMPLATE.PLEASE_SELECT_A_TEMPLATE') }}</h2>
      <p>{{ $t('SELECT_TEMPLATE.CLICK_TO_MODIFY_OR_SELECT_TEMPLATE') }}</p>
    </div>

    <div>
      <LanguageSelect v-model="language" />
      <TextProfileCreateFromTemplate :templates="templates" @created="openProfile" />
    </div>

    <div class="d-flex justify-content-end mt-2">
      <b-button size="sm" variant="outline-primary" @click="closeCurrentTab(router)">{{ $t('SELECT_TEMPLATE.CANCEL') }}</b-button>
    </div>
  </div>
</template>
