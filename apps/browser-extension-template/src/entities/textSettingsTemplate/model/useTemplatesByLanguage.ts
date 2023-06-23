import { computed, type Ref } from 'vue'
import type { Language } from '@readapt/settings'
import { textSettingsTemplates } from '../constants/textSettingsTemplates'

export function useTemplatesByLanguage(language: Ref<Language>) {
  return computed(() => {
    return textSettingsTemplates.filter((template) => {
      return template.settings.language === language.value
    })
  })
}
