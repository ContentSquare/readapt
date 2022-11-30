import { Settings } from '@readapt/settings'
import { textProfileFixture } from '../textPreferencesFixtures'
import { NonExistingIdError, useTextPreferences } from './useTextPreferences'

describe('useTextPreferences()', () => {
  afterEach(async () => {
    useTextPreferences().reset()
  })

  describe('createProfile()', () => {
    it('should create a profile from name and settings', () => {
      const { preferences: preferencesState, createProfile } = useTextPreferences()
      console.log(JSON.stringify(preferencesState))

      createProfile({
        name: textProfileFixture.name,
        settings: textProfileFixture.settings
      })

      expect(preferencesState.profiles).toEqual([textProfileFixture])
    })

    it('should return the newly created profile id', () => {
      const { createProfile } = useTextPreferences()

      const newProfileId = createProfile({
        name: textProfileFixture.name,
        settings: textProfileFixture.settings
      })

      expect(newProfileId).toEqual(1)
    })

    it('should generate unique profile ids', () => {
      const {
        preferences: { profiles },
        createProfile
      } = useTextPreferences()

      createProfile({
        name: textProfileFixture.name,
        settings: textProfileFixture.settings
      })
      createProfile({
        name: textProfileFixture.name + ' second',
        settings: textProfileFixture.settings
      })

      expect(profiles[0].id).not.toBe(profiles[1].id)
    })
  })

  describe('updateProfileSettings()', () => {
    it('should update profile settings', () => {
      const { preferences: preferencesState, setProfiles, updateProfileSettings } = useTextPreferences()
      const newSettings: Settings = {
        ...textProfileFixture.settings,
        fontFamily: 'OpenDyslexic'
      }
      setProfiles([textProfileFixture])

      updateProfileSettings(textProfileFixture.id, newSettings)

      expect(preferencesState.profiles).toEqual([
        {
          ...textProfileFixture,
          settings: newSettings
        }
      ])
    })

    it('when profile id does not exist', () => {
      const { setProfiles, updateProfileSettings } = useTextPreferences()
      setProfiles([textProfileFixture])

      expect(() => {
        updateProfileSettings(1001, textProfileFixture.settings)
      }).toThrow(NonExistingIdError)
    })
  })

  describe('setProfiles()', () => {
    // TODO: add active profile id validation
    it('should set profiles', () => {
      const { preferences: preferencesState, setProfiles } = useTextPreferences()

      setProfiles([textProfileFixture])

      expect(preferencesState.profiles).toEqual([textProfileFixture])
    })
  })

  describe('setActiveProfileId()', () => {
    it('should set active profile id', async () => {
      const { preferences: preferencesState, setActiveProfileId, setProfiles } = useTextPreferences()

      setProfiles([textProfileFixture])
      setActiveProfileId(textProfileFixture.id)

      expect(preferencesState.activeProfileId).toEqual(textProfileFixture.id)
    })

    describe('when the active profile id does not exist in profiles', () => {
      it('should throw', () => {
        const { setActiveProfileId, setProfiles } = useTextPreferences()

        setProfiles([textProfileFixture])

        expect(() => setActiveProfileId(1001)).toThrow(NonExistingIdError)
      })
    })

    describe('when the active profile id is undefined', () => {
      it('should not throw', () => {
        const { setActiveProfileId, setProfiles } = useTextPreferences()

        setProfiles([textProfileFixture])
        setActiveProfileId(textProfileFixture.id)

        expect(() => setActiveProfileId(undefined)).not.toThrow()
      })
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferences: preferencesState, reset, createProfile } = useTextPreferences()

      createProfile({
        name: textProfileFixture.name,
        settings: textProfileFixture.settings
      })
      reset()

      expect(preferencesState).toEqual({
        activeProfileId: undefined,
        profiles: []
      })
    })
  })
})
