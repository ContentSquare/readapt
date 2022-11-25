import { Settings } from '@readapt/settings'

export interface TextAdaptationPreferences {
  activeProfileId?: TextAdaptationProfileId
  profiles: TextAdaptationProfile[]
}

export interface TextAdaptationProfile {
  id: TextAdaptationProfileId
  name: string
  settings: Settings
}

export type TextAdaptationProfileId = string
