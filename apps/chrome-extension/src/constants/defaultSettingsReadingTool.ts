import { SettingsReadingTool } from '@/interfaces/settingsReadingTool'

const buildDefaultSettingsReadingTool = (): SettingsReadingTool => {
  return {
    opacity: '33',
    thickness: '1'
  }
}

export { buildDefaultSettingsReadingTool }
