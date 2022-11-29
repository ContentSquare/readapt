// Todo: Refactor to simply Profile, Preferences, ProfileId
export type { TextAdaptationProfile, TextAdaptationPreferences, TextAdaptationProfileId } from './model/Preferences'
export * as TextAdaptationPreferencesFixtures from './model/preferencesFixtures'
export { usePreferences as useTextAdaptationPreferences } from './model/state/usePreferences'
export { persistStateToStorage } from './storage/persistStateToStorage'
export { executeStorageMigrations } from './storage/migrations/executeStorageMigrations'
export { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from './config/storage'
