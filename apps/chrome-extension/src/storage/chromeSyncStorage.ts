import { Storage } from './storage'

export class ChromeSyncStorage implements Storage {
  async getItem<Item>(key: string): Promise<Item | undefined> {
    const result = await chrome.storage.sync.get(key)
    if (key in result) {
      return result[key] as Item
    }
  }

  async setItem<Item>(key: string, item: Item): Promise<void> {
    await chrome.storage.sync.set({ [key]: item })
  }
}
