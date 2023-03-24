import type { Settings } from '@readapt/settings'

export interface TextSettingsTemplate {
  name: string
  descriptions: string[]
  content: string
  value: string
  settings: Settings
}
