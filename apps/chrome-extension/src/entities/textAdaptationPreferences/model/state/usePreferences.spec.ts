import { profiles } from '../preferencesFixtures'
import { useTextAdaptationPreferences } from './usePreferences'

describe('useTextAdaptationPreferences()', () => {
  afterEach(async () => {
    useTextAdaptationPreferences().reset()
  })

  describe('addProfile()', () => {
    it('should add a profile to the state', () => {
      const { preferencesState, addProfile } = useTextAdaptationPreferences()

      addProfile(profiles)

      expect(preferencesState.profiles).toEqual([profiles])
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferencesState, reset, addProfile } = useTextAdaptationPreferences()

      addProfile(profiles)
      reset()

      expect(preferencesState).toEqual({
        activeProfileId: undefined,
        profiles: []
      })
    })
  })

  describe('setProfiles()', () => {
    it('should set profiles', () => {
      const { preferencesState, setProfiles } = useTextAdaptationPreferences()

      setProfiles([profiles])

      expect(preferencesState.profiles).toEqual([profiles])
    })
  })

  describe('setActiveProfileId()', () => {
    it('should set active profile id', async () => {
      const { preferencesState, setActiveProfileId, setProfiles } = useTextAdaptationPreferences()

      setProfiles([profiles])
      setActiveProfileId(profiles.id)

      expect(preferencesState.activeProfileId).toEqual(profiles.id)
    })

    describe('when the active profile id does not exist in profiles', () => {
      it('should throw', () => {
        const { setActiveProfileId } = useTextAdaptationPreferences()

        expect(() => setActiveProfileId(profiles.id)).toThrow()
      })
    })
  })
})
