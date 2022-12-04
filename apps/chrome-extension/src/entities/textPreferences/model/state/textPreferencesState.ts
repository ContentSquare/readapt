import { reactive } from 'vue'
import { TextPreferences } from '../TextPreferences'

export const textPreferencesState = /*#__PURE__*/ reactive<TextPreferences>({
  activeProfileId: null,
  profiles: []
})
