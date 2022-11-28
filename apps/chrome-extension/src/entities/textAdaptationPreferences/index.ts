export type { TextAdaptationProfile, TextAdaptationPreferences } from './model/Preferences'

export { default as TextAdaptationProfilesDropdown } from './ui/TextAdaptationProfilesDropdown.vue'

export { profiles as textAdaptationProfileFixture } from './model/preferencesFixtures'

export { useTextAdaptationPreferences } from './model/state/usePreferences'
