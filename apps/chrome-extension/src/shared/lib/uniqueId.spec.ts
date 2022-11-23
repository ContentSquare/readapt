import { uniqueId } from './uniqueId'

describe('uniqueId()', () => {
  it('should return a unique id', () => {
    const id1 = uniqueId()
    const id2 = uniqueId()

    expect(id1).not.toBe(id2)
  })
})
