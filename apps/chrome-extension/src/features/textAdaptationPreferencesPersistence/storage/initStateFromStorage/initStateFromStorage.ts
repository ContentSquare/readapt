import { TextAdaptationPreferences, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'
import { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from '@/features/textAdaptationPreferencesPersistence'
import { Storage } from '@/shared/storage'

export async function initStateFromStorage(storage: Storage) {
  const { [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferencesFromStorage } = await storage.get(STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES)

  if (isTextAdaptationPreference(preferencesFromStorage)) {
    const { addProfile } = useTextAdaptationPreferences()
    preferencesFromStorage.profiles.forEach(addProfile)
  }
}

function isTextAdaptationPreference(object: any): object is TextAdaptationPreferences {
  return typeof object === 'object' && object !== null && Array.isArray(object.profiles)
}
