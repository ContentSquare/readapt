import { readonly } from 'vue'
import { Settings } from '@readapt/settings'
import { TextAdaptationProfile } from '../TextAdaptationPreferences'
import { textAdaptationPreferencesState, textAdaptationPreferencesInitialState } from './textAdaptationPreferencesState'

export function useTextAdaptationPreferences() {
  const reset = () => {
    Object.assign(textAdaptationPreferencesState, textAdaptationPreferencesInitialState)
  }

  const addProfile = (profile: TextAdaptationProfile) => {
    textAdaptationPreferencesState.profiles.push(profile)
  }

  const getProfileById = (profileId: string) => {
    return textAdaptationPreferencesState.profiles.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: string, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
    }
  }

  const preferencesState = readonly(textAdaptationPreferencesState)

  return { preferencesState, reset, addProfile, getProfileById, updateProfileSettings }
}
