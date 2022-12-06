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

    describe('when the first profile was created', () => {
      it('should set the new profile as active', () => {
        const { createProfile, preferences } = useTextPreferences()

        createProfile({
          name: profile.name,
          settings: profile.settings
        })

        expect(preferences.activeProfileId).toBe(preferences.profiles[0].id)
      })
    })

    describe('when saved profiles already exist', () => {
      it('should not modify active profile id', () => {
        const { createProfile, preferences, setProfiles } = useTextPreferences()
        setProfiles([profile])

        createProfile({
          name: profile.name,
          settings: profile.settings
        })

        expect(preferences.activeProfileId).toBe(profile.id)
      })
    })
  })

  describe('updateProfile()', () => {
    it('should update profile settings', () => {
      const { preferences, setProfiles, updateProfile } = useTextPreferences()
      const newSettings: Settings = {
        ...profile.settings,
        fontFamily: 'OpenDyslexic'
      }
      setProfiles([profile])

      updateProfile(profile.id, { settings: newSettings })

      expect(preferences.profiles).toEqual([
        {
          ...profile,
          settings: newSettings
        }
      ])
    })

    it('should update profile name', () => {
      const { preferences, setProfiles, updateProfile } = useTextPreferences()
      const newProfileName = 'New profile name'
      setProfiles([profile])

      updateProfile(profile.id, { name: newProfileName })

      expect(preferences.profiles).toEqual([
        {
          ...profile,
          name: newProfileName
        }
      ])
    })

    it('when profile id does not exist', () => {
      const { setProfiles, updateProfile } = useTextPreferences()
      setProfiles([profile])

      expect(() => {
        updateProfile(1001, { settings: profile.settings })
      }).toThrow(NonExistingIdError)
    })
  })

  describe('setProfiles()', () => {
    it('should set profiles', () => {
      const { preferences, setProfiles } = useTextPreferences()

      setProfiles([profile])

      expect(preferences.profiles).toEqual([profile])
    })

    it('should update the active profile', () => {
      const { preferences, setProfiles } = useTextPreferences()

      setProfiles([profile])

      expect(preferences.activeProfileId).toBe(profile.id)
    })

    describe('when settings an empty list of profiles', () => {
      it('should clear the active profile id', () => {
        const { preferences, setProfiles } = useTextPreferences()

        setProfiles([profile])
        setProfiles([])
        expect(preferences.activeProfileId).toBeNull()
      })
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
