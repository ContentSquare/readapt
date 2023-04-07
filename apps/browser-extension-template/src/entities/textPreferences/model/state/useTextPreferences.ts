import { readonly } from 'vue'
import type { Settings } from '@readapt/settings'
import type { TextProfile, TextProfileId } from '../TextPreferences'
import { textPreferencesState as state } from './textPreferencesState'
import cloneDeep from 'lodash-es/cloneDeep'

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

  const getProfileById = (profileId: TextProfileId): TextProfile => {
    return state.profiles.find(({ id }) => id === profileId) as TextProfile
  }

  const updateProfile = (profileId: TextProfileId, { settings, name }: { settings?: Settings; name?: string }) => {
    const profile = getProfileById(profileId)

    if (settings) {
      profile.settings = cloneDeep(settings)
    }
    if (name) {
      profile.name = name
    }
  }

  const deleteProfile = (profileId: TextProfileId) => {
    state.profiles = state.profiles.filter(({ id }) => id !== profileId)

    if (state.profiles.length === 0) {
      state.activeProfileId = null
    } else if (profileId === state.activeProfileId) {
      state.activeProfileId = state.profiles[0].id
    }
  }

  const setActiveProfileId = (activeProfileId: TextProfileId) => {
    state.activeProfileId = activeProfileId
  }

  const preferencesReadonly = readonly(state)

  return {
    preferences: preferencesReadonly,
    reset,
    setProfiles,
    createProfile,
    getProfileById,
    updateProfile,
    deleteProfile,
    setActiveProfileId,
    generateNextProfileId
  }
}
