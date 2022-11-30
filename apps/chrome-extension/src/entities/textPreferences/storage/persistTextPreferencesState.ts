import { watchEffect } from 'vue'
import { Storage } from '@/shared/storage'
import { TextPreferences } from '../model/TextPreferences'
import { STORAGE_KEY_TEXT_PREFERENCES } from '../config/storage'
import { useTextPreferences } from '../model/state/useTextPreferences'

export async function persistTextPreferencesState(storage: Storage) {
  const { preferences: preferencesState, setProfiles, setActiveProfileId } = useTextPreferences()

  const { [STORAGE_KEY_TEXT_PREFERENCES]: preferencesFromStorage } = await storage.get(STORAGE_KEY_TEXT_PREFERENCES)

  if (isTextAdaptationPreferences(preferencesFromStorage)) {
    setProfiles(preferencesFromStorage.profiles)
    setActiveProfileId(preferencesFromStorage.activeProfileId)
  }

  return watchEffect(() => {
    storage.set({
      [STORAGE_KEY_TEXT_PREFERENCES]: preferencesState
    })
  })
}

function isTextAdaptationPreferences(object: any): object is TextPreferences {
  return typeof object === 'object' && object !== null && Array.isArray(object.profiles)
}
