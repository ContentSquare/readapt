export interface Persistence {
  getItem<Item>(key: string): Item | undefined
  setItem<Item>(item: Item): void
}
