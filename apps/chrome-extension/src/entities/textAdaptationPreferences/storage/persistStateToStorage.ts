import { Storage } from '@/shared/storage'
import { TextAdaptationPreferences } from '../model/Preferences'
import { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from '../config/storage'
import { useTextAdaptationPreferences } from '../model/state/usePreferences'

export async function persistStateToStorage(storage: Storage) {
  const { setProfiles, setActiveProfileId } = useTextAdaptationPreferences()

  const { [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferencesFromStorage } = await storage.get(STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES)

  if (isTextAdaptationPreferences(preferencesFromStorage)) {
    setProfiles(preferencesFromStorage.profiles)
    setActiveProfileId(preferencesFromStorage.activeProfileId)
  }
}

function isTextAdaptationPreferences(object: any): object is TextAdaptationPreferences {
  return typeof object === 'object' && object !== null && Array.isArray(object.profiles)
}
