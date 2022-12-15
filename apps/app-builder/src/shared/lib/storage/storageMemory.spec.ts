import { StorageMemory } from './storageMemory'

describe('StorageMemory()', () => {
  let storage: StorageMemory

  beforeEach(() => {
    const initial = {
      key: 'value',
      secondKey: 'second value'
    }

    storage = new StorageMemory(initial)
  })

  describe('get', () => {
    describe('when the key has an associated value', () => {
      it('should return the value by key', async () => {
        expect(await storage.get('key')).toEqual({ key: 'value' })
      })

      it('should return values for multiple keys', async () => {
        expect(await storage.get(['key', 'secondKey'])).toEqual({
          key: 'value',
          secondKey: 'second value'
        })
      })
    })

    describe('when the key does not an associated a value', () => {
      it('should return undefined for the key', async () => {
        expect(await storage.get('nonExistingKey')).toEqual({ nonExistingKey: undefined })
      })
    })

    describe('when the key is null', () => {
      it('should return the whole storage', async () => {
        expect(await storage.get(null)).toEqual({
          key: 'value',
          secondKey: 'second value'
        })
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
        await storage.set({ newKey: 'New Value' })

        expect(await storage.get('newKey')).toEqual({ newKey: 'New Value' })
      })
    })

    describe('when the key already exists', () => {
      it('should overwrite the existing value for the key', async () => {
        await storage.set({ key: 'Updated Value' })

        expect(await storage.get('key')).toEqual({ key: 'Updated Value' })
      })
    })
  })
})
