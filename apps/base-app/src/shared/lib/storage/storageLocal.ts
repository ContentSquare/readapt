import type { StorageType, StorageItems, StorageKeys } from './storage'

export class StorageLocal implements StorageType {
  async get(key: StorageKeys): Promise<StorageItems> {
    if (typeof key === 'string') {
      return {
        [key]: this.getLocalStorageItem(key)
      }
    }
    if (Array.isArray(key)) {
      return key.reduce<StorageItems>((result, key) => {
        result[key] = this.getLocalStorageItem(key)
        return result
      }, {})
    }
    throw new Error(`Local storage does not support "${JSON.stringify(key)}" as key`)
  }

  async set(items: { [key: string]: unknown }): Promise<void> {
    for (const key of Object.keys(items)) {
      const value = items[key]
      const isObject = typeof value === 'object' && value !== null
      if (!isObject) {
        throw new Error(`Local storage cannot accept the type "${typeof value}" as a value`)
      }
      localStorage.setItem(key, JSON.stringify(items[key]))
    }
  }

  private getLocalStorageItem(key: string): unknown {
    const item = localStorage.getItem(key)
    if (item === null) {
      return undefined
    }
    return JSON.parse(item)
  }
}
