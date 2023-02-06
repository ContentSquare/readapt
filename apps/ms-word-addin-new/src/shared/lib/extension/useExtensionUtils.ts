import type { ChromeUtils } from './extensionUtils'
// import * as extensionUtilsChrome from './extensionUtilsChrome'
import * as extensionUtilsMock from './extensionUtilsMock'

export function useExtensionUtils(): ChromeUtils {
  // if (typeof chrome !== 'undefined' && chrome.extension) {
  //   return extensionUtilsChrome
  // }
  // potentially here can be connected extension utils of Firefox
  return extensionUtilsMock
}
