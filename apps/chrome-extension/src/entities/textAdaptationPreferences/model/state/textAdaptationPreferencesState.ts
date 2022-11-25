import { shallowReactive } from 'vue'
import { TextAdaptationPreferences } from '../TextAdaptationPreferences'

// @TODO: use shallowRef to increase the performance
export const textAdaptationPreferencesState = shallowReactive<TextAdaptationPreferences>({
  activeProfileId: undefined,
  profiles: []
})
