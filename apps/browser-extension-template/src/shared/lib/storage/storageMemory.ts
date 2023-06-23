import type { StorageType, StorageItems, StorageKeys } from './storage'

/**
 * Used mostly in unit tests to mock the storage
 */
export class StorageMemory implements StorageType {
  constructor(private allItems: StorageItems = {}) {}

  async get(key: StorageKeys): Promise<StorageItems> {
    if (typeof key === 'string') {
      return {
        [key]: this.allItems[key]
      }
    }
    if (Array.isArray(key)) {
      return key.reduce<StorageItems>((result, key) => {
        result[key] = this.allItems[key]
        return result
      }, {})
    }
    if (key === null) {
      return this.allItems
    }
    throw new Error(`Memory storage does not support "${JSON.stringify(key)}" as key`)
  }

  async set(items: { [key: string]: unknown }): Promise<void> {
    this.allItems = {
      ...this.allItems,
      ...items
    }
  }
}
