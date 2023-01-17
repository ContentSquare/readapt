import type { ChromeUtils } from './chromeUtils'
import * as utils from './utils'
import * as utilsMock from './utilsMock'

export function useChromeUtils(): ChromeUtils {
  if (typeof chrome !== 'undefined' && chrome.extension) {
    return utils
  }
  return utilsMock
}
