import { Storage, StorageItems, StorageKeys } from '../storage'

export class ChromeSyncStorage implements Storage {
  get(keys?: StorageKeys): Promise<StorageItems> {
    return chrome.storage.sync.get(keys)
  }

  async set(items: StorageItems): Promise<void> {
    await chrome.storage.sync.set(items)
  }
}
