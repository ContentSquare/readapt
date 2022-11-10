import { Persistence } from "./persistence";

export class PersistenceMock implements Persistence {
  constructor(public storage: Record<string, unknown> = {}) {

  }

  getItem<Item>(key: string): Item | undefined {
    if (key in this.storage) {
      return this.storage[key] as Item
    }
    return undefined
  }

  setItem<Item>(key: string, item: Item): void {
    this.storage[key] = item
  }
}
