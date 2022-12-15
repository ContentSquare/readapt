import { ref, Ref, watchEffect } from 'vue'
import { Language, getLangConfig } from '@readapt/settings'

export function useLangTextPreview(language: Ref<Language>) {
  const text = ref('')
  const updateText = (newText: string) => (text.value = newText)

  watchEffect(() => {
    text.value = getLangConfig(language.value).textPreview
  })

  return {
    text,
    updateText
  }
}
