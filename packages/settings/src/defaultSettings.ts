import { ColoredItem, ColoredOption, Language, Settings } from './models'
import {
  fontFamilyOptions,
  fontSizeOptions,
  letterSpacingOptions,
  lineSpacingOptions,
  opacityOptions,
  silentLetterOpacityOptions,
  wordSpacingOptions
} from './options'
import { getLangConfig } from './langConfig'

const buildDefaultLetterSettings = (lang: Language): ColoredItem[] => {
  const langLetters = getLangConfig(lang).letterOptions
  return buildDefaultColoredItems(langLetters)
}

const buildDefaultPhonemeSettings = (lang: Language): ColoredItem[] => {
  const langPhonemes = getLangConfig(lang).phonemeOptions
  return buildDefaultColoredItems(langPhonemes)
}

const buildDefaultColoredItems = (options: ColoredOption[]): ColoredItem[] =>
  options.map(({ key, value }) => ({
    key,
    value,
    active: false,
    bold: false
  }))

const buildDefaultSettings = (language: Language): Settings => {
  const frSettings = language === 'fr' ? { liaisonsActive: false, liaisonsOpacity: opacityOptions[0].value } : {}

  return {
    language,
    fontFamily: fontFamilyOptions[0].value,
    fontSize: fontSizeOptions[0].value,
    letterSpacing: letterSpacingOptions[0].value,
    wordSpacing: wordSpacingOptions[0].value,
    lineSpacing: lineSpacingOptions[0].value,
    syllableActive: false,
    syllableOpacity: opacityOptions[0].value,
    silentLetterActive: false,
    silentLetterOpacity: silentLetterOpacityOptions[0].value,
    shadeAlternateLinesActive: false,
    shadeAlternateLinesOpacity: opacityOptions[0].value,
    phonemesActive: true,
    phonemes: buildDefaultPhonemeSettings(language),
    lettersActive: true,
    letters: buildDefaultLetterSettings(language),
    ...frSettings
  }
}

const overrideDefaultColoredItems = (defaultColoredItems: ColoredItem[], overrides: ColoredItem[]): ColoredItem[] =>
  defaultColoredItems.map((item) => {
    const overridden = overrides.find(({ value }) => item.value === value)
    return overridden ? overridden : item
  })

const overrideDefaultLetters = (lang: Language, overrides: ColoredItem[]): ColoredItem[] => {
  const letterOptions = getLangConfig(lang).letterOptions
  const lettersSettings = buildDefaultColoredItems(letterOptions)

  return overrideDefaultColoredItems(lettersSettings, overrides)
}

const overrideDefaultPhonemes = (lang: Language, overrides: ColoredItem[]): ColoredItem[] => {
  const phonemesOptions = getLangConfig(lang).phonemeOptions
  const phonemesSettings = buildDefaultColoredItems(phonemesOptions)

  return overrideDefaultColoredItems(phonemesSettings, overrides)
}

export { buildDefaultSettings, overrideDefaultLetters, overrideDefaultPhonemes }
