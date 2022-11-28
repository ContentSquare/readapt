import { textAdaptationProfileFixture } from '../fixtures/textAdaptationProfileFixture'
import { textAdaptationPreferencesInitialState } from './textAdaptationPreferencesState'
import { useTextAdaptationPreferences } from './useTextAdaptationPreferences'

describe('useTextAdaptationPreferences()', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  describe('addProfile()', () => {
    it('should add a profile to the state', () => {
      const { preferencesState, addProfile } = useTextAdaptationPreferences()

      addProfile(textAdaptationProfileFixture)

      expect(preferencesState.profiles).toEqual([textAdaptationProfileFixture])
    })
  })

  describe('reset()', () => {
    it('should reset profiles state', async () => {
      const { preferencesState, reset, addProfile } = useTextAdaptationPreferences()

      addProfile(textAdaptationProfileFixture)
      reset()

      expect(preferencesState).toEqual(textAdaptationPreferencesInitialState)
    })
  })
})
