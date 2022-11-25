import { reactive } from 'vue'
import { TextAdaptationPreferences } from '../TextAdaptationPreferences'

export const textAdaptationPreferencesState = reactive<TextAdaptationPreferences>({
  profiles: []
})
