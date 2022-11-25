import { unref } from 'vue'
import { TextAdaptationProfile } from '../TextAdaptationPreferences'
import { textAdaptationPreferencesState } from './textAdaptationPreferencesState'

export function useTextAdaptationPreferences() {
  const preferences = unref(textAdaptationPreferencesState)

  const reset = () => {
    preferences.profiles = []
  }

  const addProfile = (profile: TextAdaptationProfile) => {
    preferences.profiles.push(profile)
  }

  return { profiles: preferences.profiles, reset, addProfile }
}
