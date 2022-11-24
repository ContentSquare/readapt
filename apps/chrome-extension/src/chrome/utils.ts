/* global chrome */
import { Settings } from '@readapt/settings'
import { SettingsReadingTool } from '@/interfaces/settingsReadingTool'
import { buildDefaultSettingsReadingTool } from '@/constants/defaultSettingsReadingTool'
import { TextAdaptationProfile, STORAGE_KEY_TEXT_ADAPTATION_PROFILES } from '@/entities/textAdaptationProfile'
import { uniqueId } from '@/shared/lib'

const getCurrentTab = async (): Promise<chrome.tabs.Tab> => {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await chrome.tabs.query(queryOptions)
  return tab
}

const closeCurrentTab = async (): Promise<void> => {
  const tab = await getCurrentTab()
  if (tab?.id) {
    await chrome.tabs.remove(tab.id)
  }
}

const openSettings = async (): Promise<void> => {
  try {
    await chrome.runtime.openOptionsPage()
  } catch (e) {
    console.error(e)
  }
}

const newSettings = async (): Promise<void> => {
  try {
    await chrome.tabs.create({
      url: 'index.html#/new-settings'
    })
  } catch (e) {
    console.error(e)
  }
}

const sendMessageToCurrentTab = async (message: unknown): Promise<void> => {
  try {
    const tab = await getCurrentTab()
    await chrome.tabs.sendMessage(tab.id as number, message)
  } catch (e) {
    console.error(e)
  }
}

const broadcastMessage = async (message: unknown): Promise<void> => {
  try {
    const tabs = await chrome.tabs.query({})
    await Promise.all(
      tabs.map((tab: chrome.tabs.Tab) => {
        return chrome.tabs.sendMessage(tab.id as number, message)
      })
    )
  } catch (e) {
    console.error()
  }
}

const openTemplates = async (): Promise<void> => {
  try {
    await chrome.tabs.create({
      url: 'index.html#/templates'
    })
  } catch (e) {
    console.error(e)
  }
}

const getStoredSettings = async (): Promise<Settings | undefined> => {
  const { [STORAGE_KEY_TEXT_ADAPTATION_PROFILES]: settingsStorageModel = [] } = await chrome.storage.local.get(STORAGE_KEY_TEXT_ADAPTATION_PROFILES)
  return settingsStorageModel[0]?.settings
}

const saveSettings = async (settings: Settings): Promise<void> => {
  const settingsStorageModel: TextAdaptationProfile[] = [{ name: 'Default', id: uniqueId(), settings }]
  await chrome.storage.local.set({ [STORAGE_KEY_TEXT_ADAPTATION_PROFILES]: settingsStorageModel })
}

const saveLocale = async (locale: string): Promise<void> => {
  await chrome.storage.sync.set({ locale })
}

const getLocale = async (): Promise<string> => {
  const { locale } = await chrome.storage.sync.get('locale')
  return locale
}

const saveEnabled = async (enabled: boolean): Promise<void> => {
  await chrome.storage.sync.set({ enabled })
}

const getEnabled = async (): Promise<boolean> => {
  const { enabled } = await chrome.storage.sync.get('enabled')
  return enabled ?? true
}

const saveMaskSettings = async (maskSettings: SettingsReadingTool) => {
  await chrome.storage.sync.set({ maskSettings })
}

const getMaskSettings = async (): Promise<SettingsReadingTool> => {
  const { maskSettings } = await chrome.storage.sync.get('maskSettings')
  return maskSettings ?? buildDefaultSettingsReadingTool()
}

const saveRuleSettings = async (ruleSettings: SettingsReadingTool) => {
  await chrome.storage.sync.set({ ruleSettings })
}

const getRuleSettings = async (): Promise<SettingsReadingTool> => {
  const { ruleSettings } = await chrome.storage.sync.get('ruleSettings')
  return ruleSettings ?? buildDefaultSettingsReadingTool()
}

export {
  getCurrentTab,
  closeCurrentTab,
  openSettings,
  newSettings,
  openTemplates,
  sendMessageToCurrentTab,
  broadcastMessage,
  getStoredSettings,
  saveSettings,
  saveLocale,
  getLocale,
  saveEnabled,
  getEnabled,
  saveMaskSettings,
  getMaskSettings,
  saveRuleSettings,
  getRuleSettings
}
