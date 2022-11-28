import { readonly } from 'vue'
import { Settings } from '@readapt/settings'
import { TextAdaptationProfile } from '../Preferences'
import { preferencesState } from './preferencesState'

export function useTextAdaptationPreferences() {
  const reset = () => {
    preferencesState.activeProfileId = undefined
    preferencesState.profiles = []
  }

  const setProfiles = (profiles: TextAdaptationProfile[]) => {
    preferencesState.profiles = profiles
  }

  const addProfile = (profile: TextAdaptationProfile) => {
    preferencesState.profiles.push(profile)
  }

  const getProfileById = (profileId: string) => {
    return preferencesState.profiles.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: string, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
    }
  }

  const setActiveProfileId = (activeProfileId: string | undefined) => {
    const activeProfileIdExists = preferencesState.profiles.some(({ id }) => id === activeProfileId)
    if (activeProfileIdExists) {
      preferencesState.activeProfileId = activeProfileId
    } else {
      throw new Error('Text adaptation preferences do not contain a profile with id ' + activeProfileId)
    }
  }

  const preferencesStateReadonly = readonly(preferencesState)

  return {
    preferencesState: preferencesStateReadonly,
    reset,
    setProfiles,
    addProfile,
    getProfileById,
    updateProfileSettings,
    setActiveProfileId
  }
}
