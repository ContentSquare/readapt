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
    state.profiles = cloneDeep(profiles)
    if (profiles.length === 0) {
      state.activeProfileId = null
    } else if (!state.activeProfileId || !getProfileById(state.activeProfileId)) {
      state.activeProfileId = profiles[0].id
    }
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
    if (state.profiles.length === 1) {
      state.activeProfileId = newProfileId
    }
    return newProfileId
  }

  const getProfileById = (profileId: TextProfileId) => {
    return state.profiles.find(({ id }) => id === profileId)
  }

  const updateProfile = (profileId: TextProfileId, { settings, name }: { settings?: Settings; name?: string }) => {
    const profile = getProfileById(profileId)
    if (!profile) {
      throw new NonExistingIdError()
    }
    if (settings) {
      profile.settings = cloneDeep(settings)
    }
    if (name) {
      profile.name = name
    }
  }

  const setActiveProfileId = (activeProfileId: TextProfileId) => {
    const isValidActoveProfileId = getProfileById(activeProfileId)
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
    updateProfile,
    setActiveProfileId,
    generateNextProfileId
  }
}
