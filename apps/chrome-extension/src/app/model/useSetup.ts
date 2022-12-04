import { provide } from 'vue'
import { textPreferencesStateFactory, textPreferencesStateKey, textPreferencesStatePersist } from '@/entities/textPreferences'
import { LocalStorage } from '@/shared/storage'

export function useSetup() {
  provide(textPreferencesStateKey, textPreferencesStateFactory())

  const storage = chrome.extension ? chrome.storage.local : new LocalStorage()
  textPreferencesStatePersist(storage)
}
