/* global chrome  */
import { broadcastMessage } from '../src/chrome/utils'

chrome.runtime.onInstalled.addListener(async () => {
  console.log('readapt installed')
  const { enabled } = await chrome.storage.sync.get('enabled')
  const isEnabled = enabled ?? true

  chrome.contextMenus.create({
    title: 'Readapt',
    contexts: ['all'],
    id: 'readaptMenu',
    documentUrlPatterns: ['https://*/*', 'http://*/*']
  })

  chrome.contextMenus.create({
    title: 'Activate Readapt',
    contexts: ['all'],
    id: 'readaptActivateReadapt',
    parentId: 'readaptMenu',
    visible: !isEnabled
  })

  // chrome.contextMenus.create({
  //   title: 'Adapt whole page',
  //   contexts: ['all'],
  //   id: 'readaptMenuAdaptAction',
  //   parentId: 'readaptMenu',
  //   visible: isEnabled
  // })

  chrome.contextMenus.create({
    title: 'Reset all text',
    contexts: ['all'],
    id: 'readaptMenuResetAction',
    parentId: 'readaptMenu',
    visible: isEnabled
  })

  chrome.contextMenus.create({
    title: 'Activate mask',
    contexts: ['all'],
    id: 'readaptAddMask',
    parentId: 'readaptMenu',
    visible: isEnabled
  })

  chrome.contextMenus.create({
    title: 'Activate ruler',
    contexts: ['all'],
    id: 'readaptAddRuler',
    parentId: 'readaptMenu',
    visible: isEnabled
  })
})

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  let message

  if (info.menuItemId === 'readaptActivateReadapt') {
    await chrome.storage.sync.set({ enabled: true })
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

  await chrome.tabs.sendMessage(tab.id as number, message)
})

chrome.storage.onChanged.addListener(async (changes) => {
  if (hasEnabledChanged(changes)) {
    const { enabled } = await chrome.storage.sync.get('enabled')
    const isEnabled = enabled ?? true
    switchEnabledContextMenu(isEnabled)
    return
  }

  if (hasSettingsChanged(changes)) {
    await broadcastMessage('REFRESH')
  }
})

const hasEnabledChanged = (changes: { [p: string]: chrome.storage.StorageChange }): boolean => {
  for (const [key] of Object.entries(changes)) {
    if (key === 'enabled') {
      return true
    }
  }
  return false
}

const switchEnabledContextMenu = (enabled: boolean): void => {
  // chrome.contextMenus.update('readaptMenuAdaptAction', { visible: enabled })
  chrome.contextMenus.update('readaptMenuResetAction', { visible: enabled })
  chrome.contextMenus.update('readaptAddMask', { visible: enabled })
  chrome.contextMenus.update('readaptAddRuler', { visible: enabled })
  // update activate readapt visibility
  chrome.contextMenus.update('readaptActivateReadapt', { visible: !enabled })
}

const hasSettingsChanged = (changes: { [p: string]: chrome.storage.StorageChange }): boolean => {
  for (const [key] of Object.entries(changes)) {
    if (key === 'settings') {
      return true
    }
  }
  return false
}
