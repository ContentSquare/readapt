import { AnaliseTextFn } from '@readapt/text-engine'
import { Settings } from '@readapt/settings'

import { generateHtmlElementStyles } from './adaptHtmlElementStyle'
import { buildAdaptTextContentForText } from './adaptTextContent'
import { generateTextContentStyles } from './adaptTextContentStyle'
import { adaptShadeAlternateLinesForText } from './adaptShadeAlternateLines'

const adaptHtmlText =
  (analyse: AnaliseTextFn) =>
  (htmlText: string, settings: Settings): string => {
    // General Settings do not require text analyse
    let settingsStyles = generateHtmlElementStyles(settings)

    // Settings with text analyse
    const adaptTextContent = buildAdaptTextContentForText(analyse)

    const liaisonsPhonemes = new Set<string>()
    const langStyles = generateTextContentStyles(settings, '', liaisonsPhonemes)
    settingsStyles += langStyles

    if (settings.shadeAlternateLinesActive) {
      const { className, style } = adaptShadeAlternateLinesForText(settings.shadeAlternateLinesOpacity)

      return `<div>
        <style>
          ${settingsStyles}
          ${style}
        </style>
        <span class="readapt-content ${className}">
          ${adaptTextContent(htmlText, settings, liaisonsPhonemes)}
        </span>
      </div>`
    }

    return `<div>
      <style>
        ${settingsStyles}
      </style>
      <span class="readapt-content">
        ${adaptTextContent(htmlText, settings, liaisonsPhonemes)}
      </span>
    </div>`
  }

export { adaptHtmlText }
