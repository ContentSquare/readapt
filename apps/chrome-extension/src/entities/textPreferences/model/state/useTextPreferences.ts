import { readonly } from 'vue'
import { Settings } from '@readapt/settings'
import { TextProfile, TextProfileId } from '../TextPreferences'
import { textPreferencesState as state } from './textPreferencesState'
import cloneDeep from 'lodash/cloneDeep'

export class NonExistingIdError extends Error {}

export function useTextPreferences() {
  const reset = () => {
    state.activeProfileId = null
    state.profiles = []
  }

  const setProfiles = (profiles: TextProfile[]) => {
    state.profiles = profiles
  }

  const generateNextProfileId = (): TextProfileId => {
    const ids = state.profiles.map(({ id }) => id)
    return Math.max(0, ...ids) + 1
  }

  const createProfile = ({ name, settings }: { name: string; settings: Settings }): TextProfileId => {
    const newProfileId = generateNextProfileId()
    state.profiles.push({
      id: newProfileId,
      name,
      settings: cloneDeep(settings)
    })
    return newProfileId
  }

  const getProfileById = (profileId: TextProfileId) => {
    return state.profiles.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: TextProfileId, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
    } else {
      throw new NonExistingIdError()
    }
  }

  const setActiveProfileId = (activeProfileId: TextProfileId | null) => {
    const isValidActoveProfileId = activeProfileId === null || Boolean(getProfileById(activeProfileId))
    if (isValidActoveProfileId) {
      state.activeProfileId = activeProfileId
    } else {
      throw new NonExistingIdError()
    }
  }

  const preferencesReadonly = readonly(state)

  return {
    preferences: preferencesReadonly,
    reset,
    setProfiles,
    createProfile,
    getProfileById,
    updateProfileSettings,
    setActiveProfileId
  }
}
