import router from '@/router'
import { SettingsReadingTool } from '@/interfaces/settingsReadingTool'
import { buildDefaultSettingsReadingTool } from '@/constants/defaultSettingsReadingTool'
import { Settings } from '@readapt/settings'
import { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from '@/features/textAdaptationPreferencesPersistence'
import { TextAdaptationPreferences } from '@/entities/textAdaptationPreferences'

const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  console.log('getCurrentTab mock')
  return { id: 0 } as chrome.tabs.Tab
}

const closeCurrentTab = async (): Promise<void> => {
  console.log('closeCurrentTab mock')
  await router.push('/')
}

const openSettings = async (): Promise<void> => {
  await router.push('settings')
}

const newSettings = async (): Promise<void> => {
  await router.push('new-settings')
}

const openTemplates = async (): Promise<void> => {
  await router.push('templates')
}

const sendMessageToCurrentTab = async (message: unknown): Promise<void> => {
  console.log('sendMessageToCurrentTab: ', message)
}

const broadcastMessage = async (message: unknown): Promise<void> => {
  console.log('brodcastMessage: ', message)
}

const getStoredSettings = async (): Promise<Settings | undefined> => {
  const settingsJson = localStorage.getItem(STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES) ?? 'null'
  const defaultPreferences = {
    profiles: []
  }
  const settingsStorageModel = JSON.parse(settingsJson) ?? defaultPreferences
  return settingsStorageModel.profiles[0]?.settings
}

const saveSettings = (settings: Settings): void => {
  const preferences: TextAdaptationPreferences = {
    activeProfileId: '1',
    profiles: [{ name: 'Default', id: '1', settings }]
  }
  localStorage.setItem(STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES, JSON.stringify(preferences))
}

const saveLocale = async (locale: string): Promise<void> => {
  console.log('save locale', locale)
  localStorage.setItem('locale', locale)
}
const getLocale = async (): Promise<string> => {
  console.log('get locale')
  return localStorage.getItem('locale') as string
}

const saveEnabled = async (enabled: boolean): Promise<void> => {
  console.log('save enabled', enabled)
  localStorage.setItem('enabled', enabled.toString())
}
const getEnabled = async (): Promise<boolean> => {
  console.log('get enabled')
  const enabled = localStorage.getItem('enabled') ?? 'true'
  return enabled === 'true'
}

const saveMaskSettings = async (maskSettings: SettingsReadingTool) => {
  console.log('save MaskSettings')
  localStorage.setItem('maskSettings', JSON.stringify(maskSettings))
}

const getMaskSettings = async (): Promise<SettingsReadingTool> => {
  console.log('get maskSettings')

  const maskSettings = localStorage.getItem('maskSettings')
  if (maskSettings) {
    return JSON.parse(maskSettings)
  }
  return buildDefaultSettingsReadingTool()
}

const saveRuleSettings = async (ruleSettings: SettingsReadingTool) => {
  console.log('save ruleSettings')
  localStorage.setItem('ruleSettings', JSON.stringify(ruleSettings))
}

const getRuleSettings = async (): Promise<SettingsReadingTool> => {
  console.log('get ruleSettings')
  const ruleSettings = localStorage.getItem('ruleSettings')
  if (ruleSettings) {
    return JSON.parse(ruleSettings)
  }
  return buildDefaultSettingsReadingTool()
}

export {
  getCurrentTab,
  closeCurrentTab,
  openSettings,
  newSettings,
  openTemplates,
  sendMessageToCurrentTab,
  getStoredSettings,
  saveSettings,
  saveLocale,
  getLocale,
  broadcastMessage,
  saveEnabled,
  getEnabled,
  getMaskSettings,
  getRuleSettings,
  saveMaskSettings,
  saveRuleSettings
}
