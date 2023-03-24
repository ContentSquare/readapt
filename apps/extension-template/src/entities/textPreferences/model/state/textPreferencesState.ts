import { reactive } from 'vue'
import type { TextPreferences } from '../TextPreferences'

export const textPreferencesState = /*#__PURE__*/ reactive<TextPreferences>({
  activeProfileId: null,
  profiles: []
})
