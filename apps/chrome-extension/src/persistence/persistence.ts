export interface Persistence {
  getItem<Item>(key: string): Item | undefined
  setItem<Item>(key: string, item: Item): void
}
