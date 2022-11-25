import { textAdaptationProfileFixture } from '../fixtures/textAdaptationProfileFixture'
import { useTextAdaptationPreferences } from './useTextAdaptationPreferences'

describe('useTextAdaptationPreferences()', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  it('should return the profiles array', () => {
    const { profiles } = useTextAdaptationPreferences()
    expect(profiles).toEqual([])
  })

  it('should reset profiles state', () => {
    const { profiles, reset, addProfile } = useTextAdaptationPreferences()

    reset()
    addProfile(textAdaptationProfileFixture)

    expect(profiles).toEqual([])
  })

  it('should add a profile to the state', () => {
    const { profiles, addProfile } = useTextAdaptationPreferences()

    addProfile(textAdaptationProfileFixture)

    expect(profiles).toEqual([textAdaptationProfileFixture])
  })
})
