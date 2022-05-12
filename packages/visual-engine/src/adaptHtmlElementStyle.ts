import { fontFamilyOptions, fontSizeOptions, letterSpacingOptions, lineSpacingOptions, Settings, wordSpacingOptions } from '@readapt/settings'

const fontStyles = (settings: Settings, scope: string): string => {
  const { fontFamily, fontSize, letterSpacing, wordSpacing, lineSpacing } = settings
  const fontFamilyStyle = fontFamily !== fontFamilyOptions[0].value ? `font-family: ${fontFamily};` : ''
  const fontSizeStyle = fontSize !== fontSizeOptions[0].value ? `font-size: ${fontSize};` : 'font-size: inherit;'
  const letterSpacingStyle = letterSpacing !== letterSpacingOptions[0].value ? `letter-spacing: ${letterSpacing};` : ''
  const wordSpacingStyle = wordSpacing !== wordSpacingOptions[0].value ? `word-spacing: ${wordSpacing};` : ''
  const lineHeightStyle = lineSpacing !== lineSpacingOptions[0].value ? `line-height: ${settings.lineSpacing};` : ''
  const globalStyles = fontFamilyStyle + fontSizeStyle + letterSpacingStyle + wordSpacingStyle + lineHeightStyle

  return `${scope} .readapt-content { ${globalStyles} } .readapt-content > span { font-size: inherit } ${scope} .readapt-bold { font-weight: bold }`
}

const generateHtmlElementStyles = (settings: Settings, mainClass: string): string => {
  const scope = `.${mainClass}`
  return fontStyles(settings, scope)
}

export { generateHtmlElementStyles }
