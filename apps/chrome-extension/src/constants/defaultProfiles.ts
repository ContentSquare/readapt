import { Profiles } from '@/interfaces/profiles'
import { buildDefaultSettings } from '@readapt/settings'

export const buildDefaultProfiles = (): Profiles => {
  return {
    en: buildDefaultSettings('en'),
    fr: buildDefaultSettings('fr')
  }
}
