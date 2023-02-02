import { useCreateTextProfileFromTemplate } from './useCreateProfileFromTemplate'
import { useTextPreferences, textSettingsFixture as settings, textProfileFixture as profile } from '@/entities/textPreferences'

describe('useCreateProfileFromTemplate()', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })

  afterEach(() => {
    useTextPreferences().reset()
  })

  describe('createProfile()', () => {
    it('should create a profile in preferences', () => {
      const create = useCreateTextProfileFromTemplate()
      const { preferences } = useTextPreferences()

      create(settings)

      expect(preferences.profiles).toEqual([
        profile,
        {
          id: 2,
          name: 'From template (2)',
          settings
        }
      ])
    })

    it('should return the newly created profile id', () => {
      const create = useCreateTextProfileFromTemplate()

      expect(create(settings)).toBe(2)
    })
  })
})
