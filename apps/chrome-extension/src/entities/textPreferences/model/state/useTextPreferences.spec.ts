import { Settings } from '@readapt/settings'
import { textProfileFixture as profile } from '../textPreferencesFixtures'
import { NonExistingIdError, useTextPreferences } from './useTextPreferences'

describe('useTextPreferences()', () => {
  afterEach(async () => {
    useTextPreferences().reset()
  })

  describe('createProfile()', () => {
    it('should create a profile from name and settings', () => {
      const { preferences, createProfile } = useTextPreferences()

      createProfile({
        name: profile.name,
        settings: profile.settings
      })

      expect(preferences.profiles).toEqual([profile])
    })

    it('should return the newly created profile id', () => {
      const { createProfile } = useTextPreferences()

      const newProfileId = createProfile({
        name: profile.name,
        settings: profile.settings
      })

      expect(newProfileId).toEqual(1)
    })

    it('should generate unique profile ids', () => {
      const {
        preferences: { profiles },
        createProfile
      } = useTextPreferences()

      createProfile({
        name: profile.name,
        settings: profile.settings
      })
      createProfile({
        name: profile.name + ' second',
        settings: profile.settings
      })

      expect(profiles[0].id).not.toBe(profiles[1].id)
    })
  })

  describe('updateProfileSettings()', () => {
    it('should update profile settings', () => {
      const { preferences, setProfiles, updateProfileSettings } = useTextPreferences()
      const newSettings: Settings = {
        ...profile.settings,
        fontFamily: 'OpenDyslexic'
      }
      setProfiles([profile])

      updateProfileSettings(profile.id, newSettings)

      expect(preferences.profiles).toEqual([
        {
          ...profile,
          settings: newSettings
        }
      ])
    })

    it('when profile id does not exist', () => {
      const { setProfiles, updateProfileSettings } = useTextPreferences()
      setProfiles([profile])

      expect(() => {
        updateProfileSettings(1001, profile.settings)
      }).toThrow(NonExistingIdError)
    })
  })

  describe('setProfiles()', () => {
    // TODO: add active profile id validation
    it('should set profiles', () => {
      const { preferences, setProfiles } = useTextPreferences()

      setProfiles([profile])

      expect(preferences.profiles).toEqual([profile])
    })
  })

  describe('setActiveProfileId()', () => {
    it('should set active profile id', async () => {
      const { preferences, setActiveProfileId, setProfiles } = useTextPreferences()
      setProfiles([profile])

      setActiveProfileId(profile.id)

      expect(preferences.activeProfileId).toEqual(profile.id)
    })

    describe('when the active profile id does not exist in profiles', () => {
      it('should throw', () => {
        const { setActiveProfileId, setProfiles } = useTextPreferences()
        setProfiles([profile])

        expect(() => setActiveProfileId(1001)).toThrow(NonExistingIdError)
      })
    })

    describe('when the active profile id is null', () => {
      it('should not throw', () => {
        const { setActiveProfileId, setProfiles } = useTextPreferences()

        setProfiles([profile])
        setActiveProfileId(profile.id)

        expect(() => setActiveProfileId(null)).not.toThrow()
      })
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferences, reset, setProfiles } = useTextPreferences()
      setProfiles([profile])

      reset()

      expect(preferences).toEqual({
        activeProfileId: null,
        profiles: []
      })
    })
  })
})
