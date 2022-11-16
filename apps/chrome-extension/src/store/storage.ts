import { buildDefaultProfiles, StoreModel } from '@readapt/settings'
import utils from '@/chrome'

export const getStateFromLocalStorage = async (): Promise<StoreModel> => {
  const defaultState: StoreModel = {
    profiles: buildDefaultProfiles(),
    language: 'en'
  }

  const settings = await utils.getStoredSettings()
  if (settings) {
    const { language } = settings
    defaultState.profiles[language] = settings
    defaultState.language = language
  }
  return defaultState
}
