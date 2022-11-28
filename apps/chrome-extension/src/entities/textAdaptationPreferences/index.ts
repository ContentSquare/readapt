export type { TextAdaptationProfile, TextAdaptationPreferences } from './model/Preferences'

export { default as TextAdaptationProfilesDropdown } from './ui/TextAdaptationProfilesDropdown.vue'

export { profiles as textAdaptationProfileFixture } from './model/preferencesFixtures'

export { usePreferences as useTextAdaptationPreferences } from './model/state/usePreferences'

export { persistStateToStorage } from './storage/persistStateToStorage'
export { executeStorageMigrations } from './storage/migrations/executeStorageMigrations'
export { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from './config/storage'
