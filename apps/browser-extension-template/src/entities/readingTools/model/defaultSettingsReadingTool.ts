import type { SettingsReadingTool } from './settingsReadingTool'

export const buildDefaultSettingsReadingTool = (): SettingsReadingTool => {
  return {
    opacity: '33',
    thickness: '1'
  }
}
