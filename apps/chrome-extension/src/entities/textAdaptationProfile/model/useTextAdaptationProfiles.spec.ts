import { useTextAdaptationProfiles } from './useTextAdaptationProfiles'

describe('useTextAdaptationProfiles()', () => {
  it('should return an empty array', () => {
    expect(useTextAdaptationProfiles()).toEqual([])
  })
})
