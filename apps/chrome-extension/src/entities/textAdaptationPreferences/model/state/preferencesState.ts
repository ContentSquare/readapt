import { shallowReactive } from 'vue'
import { TextAdaptationPreferences } from '../Preferences'

export const preferencesState = shallowReactive<TextAdaptationPreferences>({
  activeProfileId: undefined,
  profiles: []
})
