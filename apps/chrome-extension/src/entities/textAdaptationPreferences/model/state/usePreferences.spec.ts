import { profile } from '../preferencesFixtures'
import { usePreferences } from './usePreferences'

describe('usePreferences()', () => {
  afterEach(async () => {
    usePreferences().reset()
  })

  describe('addProfile()', () => {
    it('should add a profile to the state', () => {
      const { preferencesState, addProfile } = usePreferences()

      addProfile(profile)

      expect(preferencesState.profiles).toEqual([profile])
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

        expect(() => setActiveProfileId('non-existing-id')).toThrow()
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
      const { preferencesState, reset, addProfile } = usePreferences()

      addProfile(profile)
      reset()

      expect(preferencesState).toEqual({
        activeProfileId: undefined,
        profiles: []
      })
    })
  })
})
