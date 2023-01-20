import type { AdaptHtmlElementFn } from '@readapt/visual-engine'
import browser from 'webextension-polyfill'
import { preloadFont } from './preloadFonts'

interface VisualEngine {
  adaptHtmlElement: AdaptHtmlElementFn
}

let visualEngine: VisualEngine

const loadVisualEngine = async (): Promise<VisualEngine> => {
  if (visualEngine) {
    return visualEngine
  }

  preloadFont('/fonts/Luciole-Bold.ttf', 'font/ttf')
  preloadFont('/fonts/Luciole-Bold-Italic.ttf', 'font/ttf')
  preloadFont('/fonts/Luciole-Regular.ttf', 'font/ttf')
  preloadFont('/fonts/Luciole-Regular-Italic.ttf', 'font/ttf')
  preloadFont('/fonts/OpenDyslexic-Bold.otf', 'font/otf')
  preloadFont('/fonts/OpenDyslexic-BoldItalic.otf', 'font/otf')
  preloadFont('/fonts/OpenDyslexic-Italic.otf', 'font/otf')
  preloadFont('/fonts/OpenDyslexic-Regular.otf', 'font/otf')
  const visualEngineURL = browser.runtime.getURL('scripts/readapt-visual-engine.browser.js')
  visualEngine = await import(visualEngineURL)
  return visualEngine
}

export { loadVisualEngine }
