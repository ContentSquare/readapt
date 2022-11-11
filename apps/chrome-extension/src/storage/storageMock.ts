import { Storage } from './storage'

export class StorageMock implements Storage {
  constructor(public storage: Record<string, unknown> = {}) {}

  async getItem<Item>(key: string): Promise<Item | undefined> {
    if (key in this.storage) {
      return this.storage[key] as Item
    }
    return undefined
  }

  async setItem<Item>(key: string, item: Item): Promise<void> {
    this.storage[key] = item
  }
}
