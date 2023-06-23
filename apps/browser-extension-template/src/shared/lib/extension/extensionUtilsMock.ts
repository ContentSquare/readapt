import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'
import type { Router } from 'vue-router'
import type browser from 'webextension-polyfill'

const getCurrentTab = async (): Promise<browser.Tabs.Tab> => {
  console.log('getCurrentTab mock')
  return { id: 0 } as browser.Tabs.Tab
}

const closeCurrentTab = async (router?: Router): Promise<void> => {
  console.log('closeCurrentTab mock')
  router?.push('/')
}

const openOptionsPage = async (params?: Record<string, string>, router?: Router): Promise<void> => {
  router?.push({
    name: 'options',
    query: params
  })
}

const openTemplates = async (router?: Router): Promise<void> => {
  router?.push('templates')
}

const sendMessageToCurrentTab = async (message: unknown): Promise<void> => {
  console.log('sendMessageToCurrentTab: ', message)
}

const broadcastMessage = async (message: unknown): Promise<void> => {
  console.log('brodcastMessage: ', message)
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
  openOptionsPage,
  openTemplates,
  sendMessageToCurrentTab,
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
