<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Language, Settings } from '@readapt/settings'
import { TextSettingsTemplatePreview } from '@/entities/TextSettingsTemplate'
import { templatesToDisplay } from '../constants/templatesToDisplay'
import type { SettingsTemplate } from '@/interfaces'
import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'
import { LanguageSelector } from '@readapt/shared-components'
import { useTextPreferences } from '@/entities/textPreferences'
import cloneDeep from 'lodash-es/cloneDeep'

const isSameLanguage = (language: Language) => {
  return (template: SettingsTemplate) => template.settings.language === language
}

const selectedLanguage = ref<Language>('en')
const onLanguageChange = (lang: Language) => {
  selectedLanguage.value = lang
  selectedTemplate.value = filteredTemplates.value[0]
}
const { closeCurrentTab } = utils

const filteredTemplates = computed(() => templatesToDisplay.filter(isSameLanguage(selectedLanguage.value)))
const selectedTemplate = ref<SettingsTemplate>(filteredTemplates.value[0])

const { createProfile, generateNextProfileId } = useTextPreferences()

const createProfileFromTemplate = (settings: Settings) => {
  const newProfileId = generateNextProfileId()
  createProfile({
    name: 'From template ' + newProfileId,
    settings: cloneDeep(settings)
  })
  return newProfileId
}

const router = useRouter()

const onModifyTemplate = (settings: Settings) => {
  const newProfileId = createProfileFromTemplate(settings)
  router.push({ path: 'options?profileId=' + newProfileId })
}
</script>

<template>
  <div class="container-md">
    <div class="mt-2">
      <h2>{{ $t('SELECT_TEMPLATE.PLEASE_SELECT_A_TEMPLATE') }}</h2>
      <p>{{ $t('SELECT_TEMPLATE.CLICK_TO_MODIFY_OR_SELECT_TEMPLATE') }}</p>
      <p><b-icon-exclamation-triangle /> {{ $t('SELECT_TEMPLATE.CLICK_ON_SELECT_WARNING') }}</p>
    </div>

    <div>
      <LanguageSelector :value="selectedLanguage" @change="onLanguageChange" />

      <template v-for="template in filteredTemplates">
        <div class="mt-2" lg="6" sm="12" md="12" :key="template.value">
          <TextSettingsTemplatePreview name="template-radio-field" :template="template" @modify="onModifyTemplate" />
        </div>
      </template>
    </div>

    <div class="d-flex justify-content-end mt-2">
      <b-button size="sm" variant="outline-primary" @click="closeCurrentTab(router)">{{ $t('SELECT_TEMPLATE.CANCEL') }}</b-button>
    </div>
  </div>
</template>
