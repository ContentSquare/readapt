export type StorageItems = { [key: string]: unknown }
export type StorageKeys = string | string[] | { [key: string]: unknown } | null

export interface Storage {
  get(keys?: StorageKeys): Promise<StorageItems>
  set(items: StorageItems): Promise<void>
}
