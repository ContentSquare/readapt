import { Settings } from '@readapt/settings'

export const loadStoredSettings = (): Settings | undefined => {
  const savedSettings = localStorage.getItem('settings')
  if (!savedSettings) {
    return
  }
  return JSON.parse(savedSettings) as Settings
}

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem('settings', JSON.stringify(settings))

  chrome?.storage?.local.set({ settings }, () => {
    console.log('Value is set to ' + settings)
  })
}
