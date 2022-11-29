import { reactive } from 'vue'
import { TextAdaptationPreferences } from '../Preferences'

// TODO: try to find a more performant solution
export const preferencesState = reactive<TextAdaptationPreferences>({
  activeProfileId: undefined,
  profiles: []
})
