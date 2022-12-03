import { computed, ref } from 'vue'
import { getLangConfig, Language } from '@readapt/settings'

export function useLanguage() {
  const language = ref<Language>('en')
  const languageConfig = computed(() => getLangConfig(language.value))
  const setLanguage = (newLanguage: Language) => (language.value = newLanguage)

  return {
    language,
    languageConfig,
    setLanguage
  }
}
