import { Settings } from '@readapt/settings'

export interface SettingsTemplate {
  name: string
  descriptions: string[]
  content: string
  value: string
  settings: Settings
}
