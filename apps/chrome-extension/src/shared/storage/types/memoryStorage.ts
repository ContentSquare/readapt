import { Storage, StorageItems } from '../storage'

/**
 * Used mostly for unit tests to mock the storage
 */
export class MemoryStorage implements Storage {
  constructor(public allItems: StorageItems = {}) {}

  async get(key: string): Promise<StorageItems> {
    // @TODO: add support for other keys format
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
}
