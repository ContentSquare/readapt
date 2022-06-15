import { AnaliseTextFn, Lang, TextAnalysis } from './models'
import { enPhonemes, frPhonemes, possibleLetters } from './constants'
import { analyseTokenizedText, appendAnalyse } from './library'
import { findFrenchLiaison, handleFrenchHiatusSyllables } from './fr/fr.utils'

/**
 * @param {string} text - text to be analysed
 * @param {Lang} lang - lang to be used to analyse the text
 *
 * @public
 *
 * @returns {TextAnalysis} the result of text analysis
 *
 * @example
 *
 * ```typescript
 * const analyseResult = analyse('hello', 'en')
 * ```
 * ```json
 * // Output =>
 * {
 *    phonemes: [16, 3, 21, 21, 15],
 *    syllables: [[0, 2], [3, 4]]
 * }
 * ```
 */
const analyse: AnaliseTextFn = (text: string, lang: Lang): TextAnalysis => {
  let analyseText: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [], liaisons: [] }
  let analyseWord: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [], liaisons: [] }
  let currentWord = ''
  const lastIndex = text.length - 1
  text.split('').forEach((letter, index) => {
    if (possibleLetters.includes(letter)) {
      currentWord = currentWord.concat(letter)
    } else {
      if (currentWord && currentWord.length !== 0) {
        analyseWord = analyseTokenizedText(currentWord, lang)
        analyseText = appendAnalyse(analyseText, analyseWord)
        if (lang === 'fr') {
          const liaison = findFrenchLiaison(text, currentWord, index)
          if (liaison) {
            analyseText.liaisons?.push(liaison)
          }
        }
        currentWord = ''
      }
      analyseText.phonemes.push(0)
    }
    const isEndOfText = index === lastIndex
    if (isEndOfText) {
      if (currentWord && currentWord.length !== 0) {
        analyseWord = analyseTokenizedText(currentWord, lang)
        analyseText = appendAnalyse(analyseText, analyseWord)
      }
    }
  })
  if (text.toLowerCase().includes('-t-') && lang === 'fr') {
    analyseText.syllables = handleFrenchHiatusSyllables(text, analyseText.syllables)
  }
  if (lang === 'en') {
    delete analyseText.liaisons
  }
  return analyseText
}

/**
 * Get the list of phonemes of a lang
 * @param {Lang} lang - lang to be used
 *
 * @returns {string[]} list of phonemes of a lang
 *
 * @public
 */
const getPhonemes = (lang: Lang): string[] => {
  switch (lang) {
    case 'en':
      return enPhonemes.slice()
    case 'fr':
      return frPhonemes.slice()
    default:
      throw new Error(`Lang ${lang} is not available.`)
  }
}

export { analyse, getPhonemes }
