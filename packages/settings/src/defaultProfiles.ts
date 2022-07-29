import { Profiles } from './models'
import { buildDefaultSettings } from './defaultSettings'

/**
 * build default Profiles in all available languages
 * @return Profiles
 */
export const buildDefaultProfiles = (): Profiles => {
  return {
    en: buildDefaultSettings('en'),
    fr: buildDefaultSettings('fr')
  }
}
