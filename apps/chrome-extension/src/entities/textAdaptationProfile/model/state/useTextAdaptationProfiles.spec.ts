import { textAdaptationProfileFixture } from '../fixtures/textAdaptationProfileFixture'
import { useTextAdaptationProfiles } from './useTextAdaptationProfiles'

describe('useTextAdaptationProfiles()', () => {
  afterEach(() => {
    useTextAdaptationProfiles().reset()
  })

  it('should return the profiles array', () => {
    const { profiles } = useTextAdaptationProfiles()
    expect(profiles).toEqual([])
  })

  it('should reset profiles state', () => {
    const { profiles, reset, addProfile } = useTextAdaptationProfiles()

    reset()
    addProfile(textAdaptationProfileFixture)

    expect(profiles).toEqual([])
  })

  it('should add a profile to the state', () => {
    const { profiles, addProfile } = useTextAdaptationProfiles()

    addProfile(textAdaptationProfileFixture)

    expect(profiles).toEqual([textAdaptationProfileFixture])
  })
})
