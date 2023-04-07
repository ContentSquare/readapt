import type { Settings } from '@readapt/settings'

export interface TextPreferences {
  activeProfileId: TextProfileId | null
  profiles: TextProfile[]
}

export interface TextProfile {
  id: TextProfileId
  name: string
  settings: Settings
}

export type TextProfileId = number

export type TextSettings = Settings
