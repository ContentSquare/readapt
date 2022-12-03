import { getLangConfig } from '@readapt/settings'
import { useLanguage } from './useLanguage'

describe('useLanguage()', () => {
  it('should return english language', () => {
    const { language } = useLanguage()

    expect(language.value).toBe('en')
  })

  describe('language config', () => {
    it('should return language config', () => {
      const { languageConfig } = useLanguage()

      expect(languageConfig.value).toEqual(getLangConfig('en'))
    })

    describe('when language changes', () => {
      it('should return an updated language config', () => {
        const { language, languageConfig } = useLanguage()

        language.value = 'fr'

        expect(languageConfig.value).toEqual(getLangConfig('fr'))
      })
    })
  })

  describe('changeLanguage()', () => {
    it('should change language', () => {
      const { language, setLanguage } = useLanguage()

      setLanguage('fr')

      expect(language.value).toBe('fr')
    })
  })
})
