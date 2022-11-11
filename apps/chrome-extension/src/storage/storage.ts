export interface Storage {
  getItem<Item>(key: string): Promise<Item | undefined>
  setItem<Item>(key: string, item: Item): Promise<void>
}
