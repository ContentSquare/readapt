import { AnaliseTextFn } from '@readapt/text-engine'
import { Settings } from '@readapt/settings'

import { generateHtmlElementStyles } from './adaptHtmlElementStyle'
import { buildAdaptTextContent } from './adaptTextContent'
import { generateTextContentStyles } from './adaptTextContentStyle'
import { adaptShadeAlternateLines, cleanShadeAlternateLines } from './adaptShadeAlternateLines'

const adaptHtmlElement =
  (analyse: AnaliseTextFn) =>
  (htmlElement: HTMLElement, settings: Settings, scope: string): void => {
    // console.time('adaptHtmlElement')
    const mainClass = `readapt-${scope}`
    htmlElement.classList.add(mainClass)

    // General Settings do not require text analyse
    let settingsStyles = generateHtmlElementStyles(settings, mainClass)

    // Settings with text analyse
    const adaptTextContent = buildAdaptTextContent(analyse)
    const liaisonsPhonemes = new Set<string>()
    adaptTextContent(htmlElement, settings, liaisonsPhonemes)
    const langStyles = generateTextContentStyles(settings, mainClass, liaisonsPhonemes)
    settingsStyles += langStyles

    const styleElement = getStyleElement(scope)

    if (styleElement.textContent !== settingsStyles) {
      styleElement.textContent = settingsStyles
    }

    const elemId = generateId()
    htmlElement.setAttribute('data-readapt-id', elemId)

    cleanShadeAlternateLines(htmlElement)
    if (settings.shadeAlternateLinesActive) {
      const shadeLinesStyles = adaptShadeAlternateLines(htmlElement, settings.shadeAlternateLinesOpacity, scope)
      styleElement.textContent += ' ' + shadeLinesStyles
    }
    // console.timeEnd('adaptHtmlElement')
  }

const getStyleElement = (scope: string) => {
  let styleElement = document.head.querySelector(`[data-readapt-style=${scope}]`)
  if (styleElement) {
    return styleElement
  }
  styleElement = document.createElement('style')
  styleElement.setAttribute('type', 'text/css')
  styleElement.setAttribute('data-readapt-style', scope)
  document.head.appendChild(styleElement)
  return styleElement
}

const removeStyleElement = (scope: string): void => {
  const styleElement = document.head.querySelector(`[data-readapt-style=${scope}]`)
  if (styleElement) {
    styleElement.remove()
  }
}

const generateId = () => Math.random().toString(24).substring(4)

export { adaptHtmlElement, removeStyleElement }
