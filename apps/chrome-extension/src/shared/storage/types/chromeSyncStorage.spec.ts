import { ChromeSyncStorage } from './chromeSyncStorage'
import { chrome } from 'jest-chrome'

describe('ChromeSyncStorage', () => {
  afterEach(() => jest.resetAllMocks())

  it('should get values from sync chrome storage', async () => {
    const storage = new ChromeSyncStorage()

    await storage.get('key')

    expect(chrome.storage.sync.get).toBeCalledTimes(1)
    expect(chrome.storage.sync.get).toHaveBeenCalledWith('key')
  })

  it('should set values to sync chrome storage', async () => {
    const storage = new ChromeSyncStorage()

    await storage.set({ key: 'Value' })

    expect(chrome.storage.sync.set).toBeCalledTimes(1)
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ key: 'Value' })
  })
})
