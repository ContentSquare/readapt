export type StorageKeys = string | string[] | { [key: string]: unknown } | null
export type StorageItems = { [key: string]: unknown }

// Used StorageType because "Storage" name is already used as HTML Storage type
export interface StorageType {
  get(keys?: StorageKeys): Promise<StorageItems>
  set(items: StorageItems): Promise<void>
}
