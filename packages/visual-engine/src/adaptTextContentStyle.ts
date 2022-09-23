import { Settings } from '@readapt/settings'

const generateTextContentStyles = (settings: Settings, mainClass: string, liaisons: Set<string>): string => {
  const scope = mainClass ? `.${mainClass}` : ''
  let styles = syllableStyles(settings, scope)
  styles += letterStyles(settings, scope)
  styles += silentLettersStyles(settings, scope)
  styles += phonemeStyles(settings, scope)
  styles += generateLiaisonsStyles(settings, liaisons, scope)
  return styles
}

const syllableStyles = (settings: Settings, scope: string): string => {
  if (!settings.syllableActive) {
    return ''
  }
  const { syllableOpacity, syllableColor1, syllableColor2 } = settings

  const syllable1Style = syllableColor1 ? `${scope} .readapt-syllable-1 { background-color: ${syllableColor1}${syllableOpacity} !important }` : ''
  const syllable2Style = syllableColor2 ? `${scope} .readapt-syllable-2 { background-color: ${syllableColor2}${syllableOpacity} !important }` : ''

  return syllable1Style + syllable2Style
}

const letterStyles = (settings: Settings, scope: string): string => {
  if (!settings.lettersActive) {
    return ''
  }
  return settings.letters
    .filter(({ active, color }) => active && color)
    .reduce((allStyles, letter) => {
      return allStyles + `${scope} .readapt-letter-${letter.key} { color: ${letter.color} }`
    }, '')
}

const phonemeStyles = (settings: Settings, scope: string): string => {
  if (!settings.phonemesActive) {
    return ''
  }
  return settings.phonemes
    .filter(({ active, color }) => active && color)
    .reduce((allStyles, phoneme) => {
      return allStyles + `${scope} .readapt-phoneme-${phoneme.key} { color: ${phoneme.color} }`
    }, '')
}

const silentLettersStyles = (settings: Settings, scope: string): string => {
  if (!settings.silentLetterActive) {
    return ''
  }

  const silentLetterColor = '128, 128, 128'
  const { silentLetterOpacity } = settings

  return `${scope} .readapt-silent-letter { color:rgba(${silentLetterColor}, ${silentLetterOpacity})}`
}

const generateLiaisonsStyles = (settings: Settings, liaisons: Set<string>, scope: string): string => {
  if (!settings.liaisonsActive || liaisons.size === 0) {
    return ''
  }
  const { liaisonsOpacity } = settings
  const color = '#000000' + liaisonsOpacity

  const styleLiaisonPhonemes = [...liaisons.values()].reduce((style, item) => {
    const liaisonItemAfter = `${scope} .readapt-liaison-${item}::after { content: '${item}'; position: absolute; right: 0; top: 90%; font-family: Arial; font-size: 70%; color: ${color}; line-height: initial !important;}`
    return `${style} ${scope} .readapt-liaison-${item} { position: relative } ${liaisonItemAfter}`
  }, '')

  const styleLiaisonStart = `${scope} .readapt-liaison-start { position: relative; outline: 1px solid ${color} }`
  const styleLiaisonEnd = `${scope} .readapt-liaison-end { position: relative; outline: 1px solid ${color} }`
  const styleLiaisonSymbol = `${scope} .readapt-liaison-symbol { position: relative; bottom: -2px; border-bottom: 1px solid ${color}; border-radius: 0 0 30% 30% }`

  return `${styleLiaisonPhonemes} ${styleLiaisonStart} ${styleLiaisonEnd} ${styleLiaisonSymbol}`
}

export { generateTextContentStyles }
