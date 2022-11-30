import { reactive } from 'vue'
import { TextPreferences } from '../TextPreferences'

// TODO: try to find a more performant solution
export const textPreferencesState = reactive<TextPreferences>({
  activeProfileId: undefined,
  profiles: []
})
