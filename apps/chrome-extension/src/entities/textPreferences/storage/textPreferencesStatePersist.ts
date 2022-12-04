import { watchEffect } from 'vue'
import { Storage } from '@/shared/storage'
import { TextPreferences } from '../model/TextPreferences'
import { TEXT_PREFERENCES_STORAGE_KEY } from '../config/storage'
import { useTextPreferences } from '../model/state/useTextPreferences'

export async function textPreferencesStatePersist(storage: Storage) {
  const { preferences, setProfiles, setActiveProfileId } = useTextPreferences()

  const { [TEXT_PREFERENCES_STORAGE_KEY]: preferencesFromStorage } = await storage.get(TEXT_PREFERENCES_STORAGE_KEY)

  if (isTextAdaptationPreferences(preferencesFromStorage)) {
    setProfiles(preferencesFromStorage.profiles)
    setActiveProfileId(preferencesFromStorage.activeProfileId)
  }

  return watchEffect(() => {
    storage.set({
      [TEXT_PREFERENCES_STORAGE_KEY]: preferences
    })
  })
}

function isTextAdaptationPreferences(object: any): object is TextPreferences {
  return typeof object === 'object' && object !== null && Array.isArray(object.profiles)
}
