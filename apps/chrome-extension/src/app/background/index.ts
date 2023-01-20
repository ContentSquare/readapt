import browser from 'webextension-polyfill'
import { useExtensionUtils } from '@/shared/lib/extension'
import { textPreferencesStorageMigrate, TEXT_PREFERENCES_STORAGE_KEY } from '@/entities/textPreferences'
import { STORAGE_KEY_V2 } from '@/entities/textPreferences/config/storage'

browser.runtime.onInstalled.addListener(async () => {
  console.log('readapt installed or updated')

  await textPreferencesStorageMigrate(chrome.storage.local)

  const { enabled } = await browser.storage.sync.get('enabled')
  const isEnabled = enabled ?? true

  browser.contextMenus.create({
    title: 'Readapt',
    contexts: ['all'],
    id: 'readaptMenu',
    documentUrlPatterns: ['https://*/*', 'http://*/*']
  })

  browser.contextMenus.create({
    title: 'Activate Readapt',
    contexts: ['all'],
    id: 'readaptActivateReadapt',
    parentId: 'readaptMenu',
    visible: !isEnabled
  })

  // browser.contextMenus.create({
  //   title: 'Adapt whole page',
  //   contexts: ['all'],
  //   id: 'readaptMenuAdaptAction',
  //   parentId: 'readaptMenu',
  //   visible: isEnabled
  // })

  browser.contextMenus.create({
    title: 'Reset all text',
    contexts: ['all'],
    id: 'readaptMenuResetAction',
    parentId: 'readaptMenu',
    visible: isEnabled
  })

  browser.contextMenus.create({
    title: 'Activate mask',
    contexts: ['all'],
    id: 'readaptAddMask',
    parentId: 'readaptMenu',
    visible: isEnabled
  })

  browser.contextMenus.create({
    title: 'Activate ruler',
    contexts: ['all'],
    id: 'readaptAddRuler',
    parentId: 'readaptMenu',
    visible: isEnabled
  })
})

browser.contextMenus.onClicked.addListener(async (info, tab) => {
  let message

  if (info.menuItemId === 'readaptActivateReadapt') {
    await browser.storage.sync.set({ enabled: true })
    message = 'ENABLE'
  }

  if (info.menuItemId === 'readaptMenuAdaptAction') {
    message = 'ADAPT'
  }
  if (info.menuItemId === 'readaptMenuResetAction') {
    message = 'RESET'
  }
  if (info.menuItemId === 'readaptAddMask') {
    message = 'ADD_MASK'
  }
  if (info.menuItemId === 'readaptAddRuler') {
    message = 'ADD_RULER'
  }

  if (!message || !tab) {
    return
  }

  await browser.tabs.sendMessage(tab.id as number, message)
})

declare const __MATOMO_URL__: string // __MATOMO_URL__ gets replaced with the actual value during build

browser.storage.onChanged.addListener(async (changes) => {
  if (hasEnabledChanged(changes)) {
    const { enabled } = await browser.storage.sync.get('enabled')
    const isEnabled = enabled ?? true
    switchEnabledContextMenu(isEnabled)
    return
  }

  if (hasSettingsChanged(changes)) {
    await useExtensionUtils().broadcastMessage('REFRESH')
  }

  if (hasEventChanged(changes)) {
    await fetch(`${__MATOMO_URL__}/matomo.php?idsite=1&action_name=adapt&rec=1`)
  }
})

const hasEnabledChanged = (changes: { [p: string]: browser.Storage.StorageChange }): boolean => {
  for (const [key] of Object.entries(changes)) {
    if (key === 'enabled') {
      return true
    }
  }
  return false
}

const hasEventChanged = (changes: { [p: string]: browser.Storage.StorageChange }): boolean => {
  for (const [key] of Object.entries(changes)) {
    if (key === 'event') {
      return true
    }
  }
  return false
}

const switchEnabledContextMenu = (enabled: boolean): void => {
  // browser.contextMenus.update('readaptMenuAdaptAction', { visible: enabled })
  browser.contextMenus.update('readaptMenuResetAction', { visible: enabled })
  browser.contextMenus.update('readaptAddMask', { visible: enabled })
  browser.contextMenus.update('readaptAddRuler', { visible: enabled })
  // update activate readapt visibility
  browser.contextMenus.update('readaptActivateReadapt', { visible: !enabled })
}

const hasSettingsChanged = (changes: { [p: string]: browser.Storage.StorageChange }): boolean => {
  for (const [key] of Object.entries(changes)) {
    if (key === TEXT_PREFERENCES_STORAGE_KEY) {
      return true
    }
  }
  return false
}
