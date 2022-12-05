<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { BButton, BIconExclamationTriangle } from 'bootstrap-vue'
import { Language, Settings } from '@readapt/settings'
import TemplateSelector from '@/components/TemplateSelector.vue'
import { templates } from '@/constants/templates'
import { SettingsTemplate } from '@/interfaces'
import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'
import { LanguageSelector } from '@readapt/shared-components'
import { useTextPreferences } from '@/entities/textPreferences'
import cloneDeep from 'lodash/cloneDeep'

const isSameLanguage = (language: Language) => {
  return (template: SettingsTemplate) => template.settings.language === language
}

const TemplateSelect = defineComponent({
  components: { BIconExclamationTriangle, BButton, TemplateSelector, LanguageSelector },
  setup() {
    const selectedLanguage = ref<Language>('en')
    const onLanguageChange = (lang: Language) => {
      selectedLanguage.value = lang
      selectedTemplate.value = filteredTemplates.value[0]
    }
    const { closeCurrentTab } = utils

    const filteredTemplates = computed(() => templates.filter(isSameLanguage(selectedLanguage.value)))
    const selectedTemplate = ref<SettingsTemplate>(filteredTemplates.value[0])

    const onChangeTemplate = (value: SettingsTemplate) => (selectedTemplate.value = value)

    const { createProfile, generateNextProfileId } = useTextPreferences()
    const createProfileFromTemplate = (settings: Settings) => {
      const newProfileId = generateNextProfileId()
      createProfile({
        name: 'From template ' + newProfileId,
        settings: cloneDeep(settings)
      })
      router.push({ path: 'options?profileId=' + newProfileId })
    }

    const router = useRouter()

    const onModifyTemplate = (settings: Settings) => {
      createProfileFromTemplate(settings)
    }

    const saveTemplate = () => {
      createProfileFromTemplate(selectedTemplate.value.settings)
    }

    return {
      selectedLanguage,
      onLanguageChange,

      selectedTemplate,
      onChangeTemplate,
      onModifyTemplate,

      filteredTemplates,

      saveTemplate,
      closeCurrentTab,

      router
    }
  }
})

export default TemplateSelect
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

      <TemplateSelector :templates="filteredTemplates" :value="selectedTemplate" @change="onChangeTemplate" @modify="onModifyTemplate" />
    </div>

    <div class="mt-2 d-flex justify-content-end">
      <b-button class="mr-3" size="sm" variant="primary" @click="saveTemplate()">{{ $t('SELECT_TEMPLATE.SELECT') }}</b-button>
      <b-button size="sm" variant="outline-primary" @click="closeCurrentTab(router)">{{ $t('SELECT_TEMPLATE.CANCEL') }}</b-button>
    </div>
  </div>
</template>
