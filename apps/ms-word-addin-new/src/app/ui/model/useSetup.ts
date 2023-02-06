import { textPreferencesStatePersist } from '@/entities/textPreferences'
import { StorageLocal } from '@/shared/lib/storage'

export function useSetup() {
  const storage = typeof chrome !== 'undefined' && chrome.extension ? chrome.storage.local : new StorageLocal()
  textPreferencesStatePersist(storage)
}
