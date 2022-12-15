import { StorageLocal } from './storageLocal'

describe('StorageLocal()', () => {
  let storage: StorageLocal

  beforeEach(() => {
    localStorage.clear()
    localStorage.setItem('key', JSON.stringify({ prop: 'value' }))
    localStorage.setItem('secondKey', JSON.stringify({ prop: 'second value' }))

    storage = new StorageLocal()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('get', () => {
    describe('when the key has an associated value', () => {
      it('should return the value by key', async () => {
        expect(await storage.get('key')).toEqual({ key: { prop: 'value' } })
      })

      it('should return values for multiple keys', async () => {
        expect(await storage.get(['key', 'secondKey'])).toEqual({
          key: { prop: 'value' },
          secondKey: { prop: 'second value' }
        })
      })
    })

    describe('when the key does not an associated a value', () => {
      it('should return undefined for the key', async () => {
        expect(await storage.get('nonExistingKey')).toEqual({ nonExistingKey: undefined })
      })
    })

    describe('when the key type is not supported', () => {
      it('should throw', async () => {
        await expect(storage.get({ badKey: 'value' })).rejects.toThrow()
      })
    })
  })

  describe('set', () => {
    describe('when the new key does not exist', () => {
      it('should set a value for the key', async () => {
        await storage.set({ newKey: { prop: 'New Value' } })

        expect(await storage.get('newKey')).toEqual({ newKey: { prop: 'New Value' } })
      })
    })

    describe('when the key already exists', () => {
      it('should overwrite the existing value for the key', async () => {
        await storage.set({ key: { prop: 'Updated Value' } })

        expect(await storage.get('key')).toEqual({ key: { prop: 'Updated Value' } })
      })
    })

    describe('when the value is not an object', () => {
      it('should throw an error', async () => {
        await expect(storage.set({ key: 'string not allowed' })).rejects.toThrow()
      })
    })
  })
})
