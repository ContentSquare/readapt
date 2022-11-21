import { buildDefaultProfiles, Settings, StoreModel } from '@readapt/settings'
import { STORAGE_SETTINGS_KEY, SettingsStorageModel } from '@/settings'

export const loadStoredSettings = (): Settings | undefined => {
  const settingsStorageModelJson = localStorage.getItem(STORAGE_SETTINGS_KEY)
  if (!settingsStorageModelJson) {
    return
  }
  const settingsStorageModel = JSON.parse(settingsStorageModelJson) as SettingsStorageModel

  return settingsStorageModel[0]?.settings
}

export const saveSettings = (settings: Settings): void => {
  const settingsStorageModel: SettingsStorageModel = [{ name: 'Default', settings }]

  localStorage.setItem(STORAGE_SETTINGS_KEY, JSON.stringify(settingsStorageModel))

  chrome?.storage?.local.set({ [STORAGE_SETTINGS_KEY]: settingsStorageModel }, () => {
    console.log('Value is set to ' + settingsStorageModel)
  })
}

export const getStateFromLocalStorage = (): StoreModel => {
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
