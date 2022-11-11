import { Persistence } from './persistence'

export class PersistenceMock implements Persistence {
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
