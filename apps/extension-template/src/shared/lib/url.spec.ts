import { getQueryString } from './url'

describe('getQueryString()', () => {
  it('should return the query string of the params object', () => {
    const params = { key1: 'string 1', key2: 100 }

    expect(getQueryString(params)).toEqual('?key1=string%201&key2=100')
  })

  describe('when the params contain undefined or null values', () => {
    it('should set empty value for undefined or null', () => {
      const params = { key1: 'string 1', key2: null, key3: undefined }

      expect(getQueryString(params)).toEqual('?key1=string%201&key2&key3')
    })
  })

  describe('when params object is empty', () => {
    it('should return an empty string', () => {
      expect(getQueryString({})).toBe('')
    })
  })

  describe('when params object is not provided', () => {
    it('should return an empty string', () => {
      expect(getQueryString()).toBe('')
    })
  })
})
