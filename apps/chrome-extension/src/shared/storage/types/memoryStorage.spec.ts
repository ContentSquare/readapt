import { MemoryStorage } from './memoryStorage'

describe('MemoryStorage()', () => {
  let storage: MemoryStorage

  beforeEach(() => {
    const initial = {
      key: 'value'
    }

    storage = new MemoryStorage(initial)
  })

  describe('get', () => {
    describe('when the key has a value', () => {
      it('should return the value by key', async () => {
        expect(await storage.get('key')).toEqual({ key: 'value' })
      })
    })

    describe('when the key does not have a value', () => {
      it('should return undefined for the key', async () => {
        expect(await storage.get('nonExistingKey')).toEqual({ nonExistingKey: undefined })
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
