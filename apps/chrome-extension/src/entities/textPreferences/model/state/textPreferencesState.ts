import { reactive, InjectionKey } from 'vue'
import { TextPreferences } from '../TextPreferences'

export const textPreferencesStateFactory = () => {
  // TODO: try to find a more performant solution
  return reactive<TextPreferences>({
    activeProfileId: null,
    profiles: []
  })
}

export const textPreferencesStateKey: InjectionKey<TextPreferences> = Symbol()
