import { Storage, StorageItems, StorageKeys } from './storage'

export class StorageMock implements Storage {
  constructor(public allItems: StorageItems = {}) {}

  set(items: { [key: string]: unknown }): Promise<void> {
    throw new Error('Method not implemented.')
  }

  get(keys?: string | string[] | { [key: string]: unknown } | null | undefined): Promise<{ [key: string]: unknown }> {
    throw new Error('Method not implemented.')
  }

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
