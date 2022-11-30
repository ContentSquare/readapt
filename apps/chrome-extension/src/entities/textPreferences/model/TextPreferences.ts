import { Settings } from '@readapt/settings'

export interface TextPreferences {
  activeProfileId?: TextProfileId
  profiles: TextProfile[]
}

export interface TextProfile {
  id: TextProfileId
  name: string
  settings: Settings
}

export type TextProfileId = number
