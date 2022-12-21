import { ref, nextTick } from 'vue'
import { buildDefaultProfiles } from '@readapt/settings'
import { useFormSettings } from './useFormSettings'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import type { TextProfile, TextProfileId } from '@/entities/textPreferences'

describe('useFormSettings()', () => {
  const emptyProfileId = ref<TextProfileId | null>(null)

  const frenchProfile: TextProfile = {
    id: 2,
    name: 'French profile',
    settings: { ...buildDefaultProfiles()['fr'], fontSize: '200%' }
  }

  beforeEach(() => {
    useTextPreferences().setProfiles([profile, frenchProfile])
  })

  afterEach(() => {
    useTextPreferences().reset()
  })

  describe('when active profile id is null', () => {
    it('should provide settings in english', () => {
      const { settings } = useFormSettings(emptyProfileId)

      expect(settings.value).toEqual(buildDefaultProfiles()['en'])
    })

    it('should set language to english', () => {
      const { language } = useFormSettings(emptyProfileId)

      expect(language.value).toBe('en')
    })
  })

  describe('setLanguage()', () => {
    it('should change language', () => {
      const { language, setLanguage } = useFormSettings(emptyProfileId)

      setLanguage('fr')

      expect(language.value).toEqual('fr')
    })

    it('should pick settings of the changed language', () => {
      const { settings, setLanguage } = useFormSettings(emptyProfileId)

      setLanguage('fr')

      expect(settings.value).toEqual(buildDefaultProfiles()['fr'])
    })
  })

  describe('when having selected profile id', () => {
    it('should provide settings from the selected profile', () => {
      const selectedProfileId = ref<TextProfileId>(frenchProfile.id)
      const { settings } = useFormSettings(selectedProfileId)

      expect(settings.value).toEqual(frenchProfile.settings)
    })

    it('should provide language from the selected profile settings', () => {
      const selectedProfileId = ref<TextProfileId>(frenchProfile.id)
      const { language } = useFormSettings(selectedProfileId)

      expect(language.value).toEqual(frenchProfile.settings.language)
    })

    describe('when selected profile id changes to null', () => {
      it('should provide the default settings', async () => {
        const selectedProfileId = ref<TextProfileId | null>(frenchProfile.id)
        const { settings } = useFormSettings(selectedProfileId)

        selectedProfileId.value = null
        await nextTick()

        expect(settings.value).toEqual(buildDefaultProfiles()['en'])
      })

      it('should reset the language to english', async () => {
        const selectedProfileId = ref<TextProfileId | null>(frenchProfile.id)
        const { language } = useFormSettings(selectedProfileId)

        selectedProfileId.value = null
        await nextTick()

        expect(language.value).toBe('en')
      })
    })
  })

  describe('updateSettings()', () => {
    it('should update the settings', () => {
      const { settings, updateSettings } = useFormSettings(emptyProfileId)

      updateSettings('fontFamily', 'OpenDyslexic')

      expect(settings.value.fontFamily).toBe('OpenDyslexic')
    })

    describe('when having a selected profile', () => {
      it('should not change original selected profile settings', async () => {
        const { settings, updateSettings } = useFormSettings(ref<TextProfileId>(profile.id))

        updateSettings('fontFamily', 'OpenDyslexic')

        expect(settings.value.fontFamily).not.toBe(profile.settings.fontFamily)
      })
    })
  })
})
