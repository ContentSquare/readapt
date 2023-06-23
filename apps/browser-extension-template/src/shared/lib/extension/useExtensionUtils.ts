import browser from 'webextension-polyfill'
import type { ChromeUtils } from './extensionUtils'
import * as extensionUtilsChrome from './extensionUtilsChrome'
import * as extensionUtilsMock from './extensionUtilsMock'

export function useExtensionUtils(): ChromeUtils {
  if (typeof browser !== 'undefined' && browser.extension) {
    return extensionUtilsChrome
  }
  // potentially here can be connected extension utils of Firefox
  return extensionUtilsMock
}
