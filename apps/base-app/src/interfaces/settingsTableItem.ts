import type { ColorOption } from '@readapt/settings'

export interface SettingsTableItem {
  key: string
  value: string
  example: string
  color?: ColorOption
  bold: boolean
  active: boolean
}
