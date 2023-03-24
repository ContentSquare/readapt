import { toRaw, watch } from 'vue'
import type { StorageType } from '@/shared/lib/storage'
import type { TextPreferences } from '../model/TextPreferences'
import { TEXT_PREFERENCES_STORAGE_KEY } from '../config/storage'
import { useTextPreferences } from '../model/state/useTextPreferences'

export async function textPreferencesStatePersist(storage: StorageType) {
  const { preferences, setProfiles, setActiveProfileId } = useTextPreferences()

  const { [TEXT_PREFERENCES_STORAGE_KEY]: preferencesFromStorage } = await storage.get(TEXT_PREFERENCES_STORAGE_KEY)

  if (isTextAdaptationPreferences(preferencesFromStorage)) {
    setProfiles(preferencesFromStorage.profiles)
    if (preferencesFromStorage.activeProfileId) {
      setActiveProfileId(preferencesFromStorage.activeProfileId)
    }
  }

  return watch(preferences, () => {
    storage.set({
      [TEXT_PREFERENCES_STORAGE_KEY]: toRaw(preferences)
    })
  })
}

function isTextAdaptationPreferences(object: any): object is TextPreferences {
  return typeof object === 'object' && object !== null && object.profiles
}
