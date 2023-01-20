import browser from 'webextension-polyfill'
import { textPreferencesStatePersist } from '@/entities/textPreferences'
import { StorageLocal } from '@/shared/lib/storage'

export function useSetup() {
  const storage = browser.extension ? browser.storage.sync : new StorageLocal()
  textPreferencesStatePersist(storage)
}
