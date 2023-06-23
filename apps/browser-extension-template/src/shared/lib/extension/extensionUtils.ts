import type browser from 'webextension-polyfill'
import type { SettingsReadingTool } from '@/entities/readingTools'
import type { Router } from 'vue-router'

export interface ChromeUtils {
  getCurrentTab: () => Promise<browser.Tabs.Tab>
  openOptionsPage: (params?: Record<string, string>, router?: Router) => Promise<void>
  openTemplates: (router?: Router) => Promise<void>
  closeCurrentTab: (router?: Router) => Promise<void>
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
