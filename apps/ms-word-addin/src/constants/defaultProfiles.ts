import { Profiles } from '@/interfaces/profiles'
import { buildDefaultSettings } from '@readapt/settings'

/** build a {@link Profiles} object with default profiles in each lang (en, fr) */
export const buildDefaultProfiles = (): Profiles => {
  return {
    en: buildDefaultSettings('en'),
    fr: buildDefaultSettings('fr')
  }
}
