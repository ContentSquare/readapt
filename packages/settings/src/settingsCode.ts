import { Settings } from './models'

const encodeSettings = (settings: Settings): string => {
  const str = JSON.stringify(settings, null, '')
  return btoa(str)
}

const decodeSettings = (code: string): Settings => {
  return JSON.parse(atob(code)) as Settings
}

export { encodeSettings, decodeSettings }
