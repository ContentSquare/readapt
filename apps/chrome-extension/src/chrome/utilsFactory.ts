import * as chromeUtils from '@/chrome/utils'
import * as chromeMock from './utils.mock'
import { SettingsReadingTool } from '@/interfaces/settingsReadingTool'
import { Settings } from '@readapt/settings'

export interface ChromeUtils {
  getCurrentTab: () => Promise<chrome.tabs.Tab>
  openSettings: () => Promise<void>
  newSettings: () => Promise<void>
  openTemplates: () => Promise<void>
  closeCurrentTab: () => Promise<void>
  sendMessageToCurrentTab: (message: unknown) => Promise<void>
  broadcastMessage: (message: unknown) => Promise<void>
  getStoredSettings: () => Promise<Settings | undefined>
  saveSettings: (settings: Settings) => void
  saveLocale: (locale: string) => Promise<void>
  getLocale: () => Promise<string>
  saveEnabled: (enabled: boolean) => Promise<void>
  getEnabled: () => Promise<boolean>
  getMaskSettings: () => Promise<SettingsReadingTool>
  saveMaskSettings: (maskSettings: SettingsReadingTool) => Promise<void>
  getRuleSettings: () => Promise<SettingsReadingTool>
  saveRuleSettings: (ruleSettings: SettingsReadingTool) => Promise<void>
}

const buildUtils = (): ChromeUtils => {
  if (chrome?.extension) {
    return chromeUtils
  }
  return chromeMock
}

export { buildUtils }
