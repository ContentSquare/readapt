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

  return { profiles, reset, addProfile }
}
