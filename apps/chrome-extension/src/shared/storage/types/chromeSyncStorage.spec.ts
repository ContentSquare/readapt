import { ChromeSyncStorage } from './chromeSyncStorage'
import { chrome } from 'jest-chrome'

describe('ChromeSyncStorage', () => {
  let storage: ChromeSyncStorage
  beforeEach(() => {
    let memory: Record<string, unknown> = { key: 'value' }
    chrome.storage.sync.get.mockImplementationOnce(() => memory)
    chrome.storage.sync.set.mockImplementationOnce((items) => (memory = { ...memory, items }))
    storage = new ChromeSyncStorage()
  })

  describe('getItem()', () => {
    describe('when the storage contains a value for key', () => {
      it('should return the value', async () => {
        expect(await storage.getItem('key')).toBe('value')
      })
    })

    describe('when the storage does not contain a value for key', () => {
      it('should return undefined', async () => {
        expect(await storage.getItem('nonExistingKey')).toBeUndefined()
      })
    })
  })

  it('should set an item', async () => {
    await storage.setItem('newKey', 'newValue')

    expect(await storage.getItem('newKey')).toBe('newValue')
  })
})
