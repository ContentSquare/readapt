import { profiles } from '../preferencesFixtures'
import { usePreferences } from './usePreferences'

describe('usePreferences()', () => {
  afterEach(async () => {
    usePreferences().reset()
  })

  describe('addProfile()', () => {
    it('should add a profile to the state', () => {
      const { preferencesState, addProfile } = usePreferences()

      addProfile(profiles)

      expect(preferencesState.profiles).toEqual([profiles])
    })
  })

  describe('setProfiles()', () => {
    // TODO: add active profile id validation
    it('should set profiles', () => {
      const { preferencesState, setProfiles } = usePreferences()

      setProfiles([profiles])

      expect(preferencesState.profiles).toEqual([profiles])
    })
  })

  describe('setActiveProfileId()', () => {
    it('should set active profile id', async () => {
      const { preferencesState, setActiveProfileId, setProfiles } = usePreferences()

      setProfiles([profiles])
      setActiveProfileId(profiles.id)

      expect(preferencesState.activeProfileId).toEqual(profiles.id)
    })

    describe('when the active profile id does not exist in profiles', () => {
      it('should throw', () => {
        const { setActiveProfileId, setProfiles } = usePreferences()

        setProfiles([profiles])

        expect(() => setActiveProfileId('non-existing-id')).toThrow()
      })
    })

    describe('when the active profile id is undefined', () => {
      it('should not throw', () => {
        const { setActiveProfileId, setProfiles } = usePreferences()

        setProfiles([profiles])
        setActiveProfileId(profiles.id)

        expect(() => setActiveProfileId(undefined)).not.toThrow()
      })
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferencesState, reset, addProfile } = usePreferences()

      addProfile(profiles)
      reset()

      expect(preferencesState).toEqual({
        activeProfileId: undefined,
        profiles: []
      })
    })
  })
})
