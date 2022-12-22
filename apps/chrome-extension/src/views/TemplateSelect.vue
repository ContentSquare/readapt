<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { BButton } from 'bootstrap-vue'
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
  components: { BButton, TemplateSelector, LanguageSelector },
  setup() {
    const selectedLanguage = ref<Language>('en')
    const onLanguageChange = (lang: Language) => {
      selectedLanguage.value = lang
    }
    const { closeCurrentTab } = utils

    const filteredTemplates = computed(() => templates.filter(isSameLanguage(selectedLanguage.value)))

    const { createProfile, generateNextProfileId } = useTextPreferences()

    const router = useRouter()

    const onModifyTemplate = (settings: Settings) => {
      const newProfileId = generateNextProfileId()
      createProfile({
        name: 'From template ' + newProfileId,
        settings: cloneDeep(settings)
      })
      router.push({ path: 'options?profileId=' + newProfileId })
    }

    return {
      selectedLanguage,
      onLanguageChange,
      onModifyTemplate,
      filteredTemplates,
      closeCurrentTab,
      router
    }
  }
})

export default TemplateSelect
</script>

<template>
  <div class="container-md p-2">
    <div>
      <h2>{{ $t('SELECT_TEMPLATE.PLEASE_SELECT_A_TEMPLATE') }}</h2>
      <p>{{ $t('SELECT_TEMPLATE.CLICK_TO_MODIFY_OR_SELECT_TEMPLATE') }}</p>
    </div>

    <div>
      <LanguageSelector :value="selectedLanguage" @change="onLanguageChange" />
      <TemplateSelector :templates="filteredTemplates" @modify="onModifyTemplate" />
    </div>

    <div class="mt-2 d-flex justify-content-end">
      <b-button size="sm" variant="outline-primary" @click="closeCurrentTab(router)">{{ $t('SELECT_TEMPLATE.CANCEL') }}</b-button>
    </div>
  </div>
</template>
