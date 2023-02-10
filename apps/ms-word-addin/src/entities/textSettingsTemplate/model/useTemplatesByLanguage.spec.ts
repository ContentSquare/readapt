import { ref } from 'vue'
import type { Language } from '@readapt/settings'
import { useTemplatesByLanguage } from './useTemplatesByLanguage'

describe('useTemplatesByLanguage()', () => {
  it('should return an array of templates by language', () => {
    const language = ref<Language>('fr')
    const templates = useTemplatesByLanguage(language)

    for (const template of templates.value) {
      expect(template.settings.language).toBe(language.value)
    }
  })
})
