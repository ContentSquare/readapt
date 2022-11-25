import { unref } from 'vue'
import { TextAdaptationProfile } from '../TextAdaptationProfile'
import { textAdaptationProfilesState } from './textAdaptationProfilesState'

export function useTextAdaptationProfiles() {
  const profiles = unref(textAdaptationProfilesState)
  const reset = () => {
    textAdaptationProfilesState.value = []
  }
  const addProfile = (profile: TextAdaptationProfile) => {
    textAdaptationProfilesState.value.push(profile)
  }

  return { profiles, reset, addProfile }
}
