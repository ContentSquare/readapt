import { profile } from '../preferencesFixtures'
import { usePreferences } from './usePreferences'

describe('usePreferences()', () => {
  afterEach(async () => {
    usePreferences().reset()
  })

  describe('createProfile()', () => {
    it('should create a profile from name and settings', () => {
      const { preferencesState, createProfile } = usePreferences()

      createProfile({
        name: profile.name,
        settings: profile.settings
      })

      expect(preferencesState.profiles).toEqual([profile])
    })

    it('should return the newly created profile id', () => {
      const { createProfile } = usePreferences()

      const newProfileId = createProfile({
        name: profile.name,
        settings: profile.settings
      })

      expect(newProfileId).toEqual(1)
    })

    it('should generate unique profile ids', () => {
      const {
        preferencesState: { profiles },
        createProfile
      } = usePreferences()

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

  describe('setProfiles()', () => {
    // TODO: add active profile id validation
    it('should set profiles', () => {
      const { preferencesState, setProfiles } = usePreferences()

      setProfiles([profile])

      expect(preferencesState.profiles).toEqual([profile])
    })
  })

  describe('setActiveProfileId()', () => {
    it('should set active profile id', async () => {
      const { preferencesState, setActiveProfileId, setProfiles } = usePreferences()

      setProfiles([profile])
      setActiveProfileId(profile.id)

      expect(preferencesState.activeProfileId).toEqual(profile.id)
    })

    describe('when the active profile id does not exist in profiles', () => {
      it('should throw', () => {
        const { setActiveProfileId, setProfiles } = usePreferences()

        setProfiles([profile])

        expect(() => setActiveProfileId(1001)).toThrow()
      })
    })

    describe('when the active profile id is undefined', () => {
      it('should not throw', () => {
        const { setActiveProfileId, setProfiles } = usePreferences()

        setProfiles([profile])
        setActiveProfileId(profile.id)

        expect(() => setActiveProfileId(undefined)).not.toThrow()
      })
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferencesState, reset, createProfile } = usePreferences()

      createProfile({
        name: profile.name,
        settings: profile.settings
      })
      reset()

      expect(preferencesState).toEqual({
        activeProfileId: undefined,
        profiles: []
      })
    })
  })
})
