import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'
import { getQueryString } from '@/shared/lib/url'
import browser from 'webextension-polyfill'

const getCurrentTab = async (): Promise<browser.Tabs.Tab> => {
  const queryOptions = { active: true, currentWindow: true }
  const [tab] = await browser.tabs.query(queryOptions)
  return tab
}

const closeCurrentTab = async (): Promise<void> => {
  const tab = await getCurrentTab()
  if (tab?.id) {
    await browser.tabs.remove(tab.id)
  }
}

const openOptionsPage = async (params?: Record<string, string>): Promise<void> => {
  try {
    await browser.tabs.create({
      // TODO: use router as a single source of truth for URLs
      url: `index.html#/options${getQueryString(params)}`
    })
  } catch (e) {
    console.error(e)
  }
}

const sendMessageToCurrentTab = async (message: unknown): Promise<void> => {
  try {
    const tab = await getCurrentTab()
    await browser.tabs.sendMessage(tab.id as number, message)
  } catch (e) {
    console.error(e)
  }
}

const broadcastMessage = async (message: unknown): Promise<void> => {
  try {
    const tabs = await browser.tabs.query({})
    await Promise.all(
      tabs.map((tab: browser.Tabs.Tab) => {
        return browser.tabs.sendMessage(tab.id as number, message)
      })
    )
  } catch (e) {
    console.error()
  }
}

const openTemplates = async (): Promise<void> => {
  try {
    await browser.tabs.create({
      url: 'index.html#/templates'
    })
  } catch (e) {
    console.error(e)
  }
}

const saveLocale = async (locale: string): Promise<void> => {
  await browser.storage.sync.set({ locale })
}

const getLocale = async (): Promise<string> => {
  const { locale } = await browser.storage.sync.get('locale')
  return locale
}

const saveEnabled = async (enabled: boolean): Promise<void> => {
  await browser.storage.sync.set({ enabled })
}

const getEnabled = async (): Promise<boolean> => {
  const { enabled } = await browser.storage.sync.get('enabled')
  return enabled ?? true
}

const saveMaskSettings = async (maskSettings: SettingsReadingTool) => {
  await browser.storage.sync.set({ maskSettings })
}

const getMaskSettings = async (): Promise<SettingsReadingTool> => {
  const { maskSettings } = await browser.storage.sync.get('maskSettings')
  return maskSettings ?? buildDefaultSettingsReadingTool()
}

const saveRuleSettings = async (ruleSettings: SettingsReadingTool) => {
  await browser.storage.sync.set({ ruleSettings })
}

const getRuleSettings = async (): Promise<SettingsReadingTool> => {
  const { ruleSettings } = await browser.storage.sync.get('ruleSettings')
  return ruleSettings ?? buildDefaultSettingsReadingTool()
}

export {
  getCurrentTab,
  closeCurrentTab,
  openOptionsPage,
  openTemplates,
  sendMessageToCurrentTab,
  broadcastMessage,
  saveLocale,
  getLocale,
  saveEnabled,
  getEnabled,
  saveMaskSettings,
  getMaskSettings,
  saveRuleSettings,
  getRuleSettings
}
