import { shallowReactive } from 'vue'
import { TextAdaptationPreferences } from '../TextAdaptationPreferences'

export const textAdaptationPreferencesInitialState = {
  activeProfileId: undefined,
  profiles: []
}

export const textAdaptationPreferencesState = shallowReactive<TextAdaptationPreferences>({
  ...textAdaptationPreferencesInitialState
})
