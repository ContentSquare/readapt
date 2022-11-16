import { buildDefaultProfiles, Settings, StoreModel } from '@readapt/settings'

export const loadStoredSettings = async (): Promise<Settings | undefined> => {
  const savedSettings = await chrome.storage.local.get('settings')
  if (!savedSettings) {
    return
  }
  return savedSettings as Settings
}

export const saveSettings = (settings: Settings): void => {
  chrome.storage.local.set({ settings }, () => {
    console.log('Value is set to ' + settings)
  })
}

export const getStateFromLocalStorage = async (): Promise<StoreModel> => {
  const defaultState: StoreModel = {
    profiles: buildDefaultProfiles(),
    language: 'en'
  }

  const settings = await loadStoredSettings()
  if (settings) {
    const { language } = settings
    defaultState.profiles[language] = settings
    defaultState.language = language
  }
  return defaultState
}
