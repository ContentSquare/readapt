import { textAdaptationProfileFixture } from '../fixtures/textAdaptationProfileFixture'
import { useTextAdaptationPreferences } from './useTextAdaptationPreferences'

describe('useTextAdaptationPreferences()', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  describe('add profile', () => {
    it('should add a profile to the state', () => {
      const { profiles, addProfile } = useTextAdaptationPreferences()

      addProfile(textAdaptationProfileFixture)

      expect(profiles.value).toEqual([textAdaptationProfileFixture])
    })
  })

  describe('reset', () => {
    it('should reset profiles state', async () => {
      const { profiles, reset, addProfile } = useTextAdaptationPreferences()

      addProfile(textAdaptationProfileFixture)
      reset()

      expect(profiles.value).toEqual([])
    })
  })
})
