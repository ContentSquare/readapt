import { reactive } from 'vue'
import { TextPreferences } from '../TextPreferences'

// TODO: try to find a more performant solution
export const textPreferencesState = /*#__PURE__*/ reactive<TextPreferences>({
  activeProfileId: null,
  profiles: []
})
