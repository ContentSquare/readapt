import { ref, nextTick, Ref } from 'vue'
import { Language } from '@readapt/settings'
import { buildDefaultProfiles } from '@readapt/settings'
import { useFormSettings } from './useFormSettings'
import { Settings } from '@readapt/settings'

describe('useFormSettings()', () => {
  let language: Ref<Language>

  beforeEach(() => {
    language = ref('en')
  })

  it.each(['en', 'fr'] as Language[])('should return default settings for %s', (language: Language) => {
    const { settings } = useFormSettings(ref(language))

    expect(settings.value).toEqual(buildDefaultProfiles()[language])
  })

  describe('when the language changes', () => {
    it('should return settings for the new language', () => {
      const { settings } = useFormSettings(language)

      language.value = 'fr'

      expect(settings.value).toEqual(buildDefaultProfiles()['fr'])
    })
  })

  describe('when provided with the base settings', () => {
    it('should use the base settings', () => {
      const baseSettings = ref<Settings>({
        ...buildDefaultProfiles()['en'],
        fontFamily: 'OpenDyslexic'
      })
      const { settings } = useFormSettings(language, baseSettings)

      expect(settings.value).toEqual(baseSettings.value)
    })

    describe('when modifying settings', () => {
      it('should not modify the base settings', () => {
        const baseSettings = ref<Settings | null>(buildDefaultProfiles()['en'])
        const { settings } = useFormSettings(language, baseSettings)

        settings.value.fontFamily = 'OpenDyslexic'

        expect(baseSettings.value).toEqual(buildDefaultProfiles()['en'])
      })
    })

    describe('when base settings becomes null', () => {
      it('should reset the settings', async () => {
        const baseSettings = ref<Settings | null>(buildDefaultProfiles()['en'])
        const { settings } = useFormSettings(language, baseSettings)

        settings.value.fontFamily = 'OpenDyslexic'
        baseSettings.value = null

        await nextTick()

        expect(settings.value).toEqual(buildDefaultProfiles()['en'])
      })
    })
  })

  describe('update()', () => {
    it('should update the settings', () => {
      const { settings, updateSettings } = useFormSettings(language)

      updateSettings('fontFamily', 'OpenDyslexic')

      expect(settings.value.fontFamily).toBe('OpenDyslexic')
    })
  })
})
