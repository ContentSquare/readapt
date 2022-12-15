import { textPreferencesStatePersist } from '@/entities/textPreferences'
import { LocalStorage } from '@/shared/lib/storage'

export function useSetup() {
  const storage = chrome.extension ? chrome.storage.local : new LocalStorage()
  textPreferencesStatePersist(storage)
}
