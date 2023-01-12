import * as chromeUtils from '@/chrome/utils'
import * as chromeMock from './utilsMock'
import type { SettingsReadingTool } from '@/entities/readingTools'
import type VueRouter from 'vue-router'

export interface ChromeUtils {
  getCurrentTab: () => Promise<chrome.tabs.Tab>
  openOptionsPage: (params?: Record<string, string>, router?: VueRouter) => Promise<void>
  openTemplates: (router?: VueRouter) => Promise<void>
  closeCurrentTab: (router?: VueRouter) => Promise<void>
  sendMessageToCurrentTab: (message: unknown) => Promise<void>
  broadcastMessage: (message: unknown) => Promise<void>
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
