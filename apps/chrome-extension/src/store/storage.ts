import { buildDefaultProfiles, Settings, StoreModel } from '@readapt/settings'
import { STORAGE_KEY_SETTINGS } from '@/storage'

export const loadStoredSettings = (): Settings | undefined => {
  const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS)
  if (!savedSettings) {
    return
  }
  return JSON.parse(savedSettings) as Settings
}

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings))

  chrome?.storage?.local.set({ settings }, () => {
    console.log('Value is set to ' + settings)
  })
}

export const getStateFromLocalStorage = (): StoreModel => {
  const defaultState: StoreModel = {
    profiles: buildDefaultProfiles(),
    language: 'en'
  }

  const settings = loadStoredSettings()
  if (settings) {
    const { language } = settings
    defaultState.profiles[language] = settings
    defaultState.language = language
  }
  return defaultState
}
