import { ref, nextTick } from 'vue'
import { getLangConfig, type Language } from '@readapt/settings'
import { useLangTextPreview } from './useLangTextPreview'

describe('useLangTextPreview()', () => {
  const language = ref<Language>('en')

  it('shoud return text for english', () => {
    const { text } = useLangTextPreview(language)

    expect(text.value).toBe(getLangConfig('en').textPreview)
  })

  describe('when the language changes', () => {
    it('should return text preview for the new language', async () => {
      const { text } = useLangTextPreview(language)

      language.value = 'fr'
      await nextTick()

      expect(text.value).toBe(getLangConfig('fr').textPreview)
    })
  })

  describe('when text is updated', () => {
    it('should return the updated text', () => {
      const { text, updateText } = useLangTextPreview(language)

      updateText('Some adapted text')

      expect(text.value).toBe('Some adapted text')
    })
  })
})
