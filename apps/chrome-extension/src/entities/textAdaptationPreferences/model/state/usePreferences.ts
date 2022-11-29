import { readonly } from 'vue'
import { Settings } from '@readapt/settings'
import { TextAdaptationProfile, TextAdaptationProfileId } from '../Preferences'
import { preferencesState } from './preferencesState'

export function usePreferences() {
  const reset = () => {
    preferencesState.activeProfileId = undefined
    preferencesState.profiles = []
  }

  const setProfiles = (profiles: TextAdaptationProfile[]) => {
    preferencesState.profiles = profiles
  }

  const generateNextProfileId = () => {
    const ids = preferencesState.profiles.map(({ id }) => id)
    return Math.max(0, ...ids) + 1
  }

  // TODO: try to validate the input data using io-ts or a command with validation
  const createProfile = ({ name, settings }: { name: string; settings: Settings }) => {
    preferencesState.profiles.push({
      id: generateNextProfileId(),
      name,
      settings
    })
  }

  const getProfileById = (profileId: TextAdaptationProfileId) => {
    return preferencesState.profiles.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: TextAdaptationProfileId, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
    }
  }

  const setActiveProfileId = (activeProfileId: TextAdaptationProfileId | undefined) => {
    const isValidActoveProfileId = activeProfileId === undefined || preferencesState.profiles.some(({ id }) => id === activeProfileId)
    if (isValidActoveProfileId) {
      preferencesState.activeProfileId = activeProfileId
    } else {
      throw new Error(`Text adaptation preferences do not contain a profile with id "${activeProfileId}"`)
    }
  }

  const preferencesStateReadonly = readonly(preferencesState)

  return {
    preferencesState: preferencesStateReadonly,
    reset,
    setProfiles,
    createProfile,
    getProfileById,
    updateProfileSettings,
    setActiveProfileId
  }
}
