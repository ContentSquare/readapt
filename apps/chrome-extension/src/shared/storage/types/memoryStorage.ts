import { Storage, StorageItems } from '../storage'

export class MemoryStorage implements Storage {
  constructor(public allItems: StorageItems = {}) {}

  async get(key: string): Promise<StorageItems> {
    // @TODO: add support to other keys format
    return {
      [key]: this.allItems[key]
    }
  }

  async set(items: { [key: string]: unknown }): Promise<void> {
    this.allItems = {
      ...this.allItems,
      ...items
    }
  }

  // get(keys?: string | string[] | { [key: string]: unknown } | null | undefined): Promise<{ [key: string]: unknown }> {
  //   throw new Error('Method not implemented.')
  // }
  // async getItem<Item>(key: string): Promise<Item | undefined> {
  //   if (key in this.storage) {
  //     return this.storage[key] as Item
  //   }
  //   return undefined
  // }
  // async setItem<Item>(key: string, item: Item): Promise<void> {
  //   this.storage[key] = item
  // }
}
