/* global chrome */
const preloadFont = (fontPath: string, type: string) => {
  const preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.href = chrome.runtime.getURL(fontPath)
  preloadLink.as = 'font'
  preloadLink.type = type
  preloadLink.setAttribute('crossorigin', '')
  document.head.appendChild(preloadLink)
}

export { preloadFont }
