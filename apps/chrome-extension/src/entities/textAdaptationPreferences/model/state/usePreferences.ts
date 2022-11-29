import { readonly } from 'vue'
import { Settings } from '@readapt/settings'
import { TextAdaptationProfile, TextAdaptationProfileId } from '../Preferences'
import { preferencesState } from './preferencesState'

export class NonExistingProfileIdError extends Error {}

export function usePreferences() {
  const reset = () => {
    preferencesState.activeProfileId = undefined
    preferencesState.profiles = []
  }

  const setProfiles = (profiles: TextAdaptationProfile[]) => {
    preferencesState.profiles = profiles
  }

  const generateNextProfileId = (): TextAdaptationProfileId => {
    const ids = preferencesState.profiles.map(({ id }) => id)
    return Math.max(0, ...ids) + 1
  }

  const createProfile = ({ name, settings }: { name: string; settings: Settings }): TextAdaptationProfileId => {
    const newProfileId = generateNextProfileId()
    preferencesState.profiles.push({
      id: newProfileId,
      name,
      settings
    })
    return newProfileId
  }

  const getProfileById = (profileId: TextAdaptationProfileId) => {
    return preferencesState.profiles.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: TextAdaptationProfileId, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
    } else {
      throw new NonExistingProfileIdError()
    }
  }

  const setActiveProfileId = (activeProfileId: TextAdaptationProfileId | undefined) => {
    const isValidActoveProfileId = activeProfileId === undefined || Boolean(getProfileById(activeProfileId))
    if (isValidActoveProfileId) {
      preferencesState.activeProfileId = activeProfileId
    } else {
      throw new NonExistingProfileIdError()
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
