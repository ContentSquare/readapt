import { Settings } from '@readapt/settings'
import { toRefs } from 'vue'
import { TextAdaptationProfile } from '../TextAdaptationPreferences'
import { textAdaptationPreferencesState as state } from './textAdaptationPreferencesState'

export function useTextAdaptationPreferences() {
  const { profiles } = toRefs(state)

  const reset = () => {
    profiles.value = []
  }

  const addProfile = (profile: TextAdaptationProfile) => {
    profiles.value = [...profiles.value, profile]
  }

  const getProfileById = (profileId: string) => {
    return profiles.value.find(({ id }) => id === profileId)
  }

  const updateProfileSettings = (profileId: string, settings: Settings) => {
    const profile = getProfileById(profileId)
    if (profile) {
      profile.settings = settings
      profiles.value = [...profiles.value]
    }
  }

  return { profiles, reset, addProfile, getProfileById, updateProfileSettings }
}
