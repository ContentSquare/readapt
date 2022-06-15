import { Lang, Phoneme, Syllable, TextAnalysis } from './models'
import { allApostrophes, compactLetters, compactLettersMapper } from './constants'
import { normalizeAccentLetters, updatePhonemesSyllablesForApostropheLL, updatePhonemesSyllablesForApostropheS } from './en/en.utils'

import { mergeTwoSyllables } from './fr/fr.utils'

import { getWordFromDictionary, hasCommonElements } from './utils'

function compactTwoPhonemes(array: Phoneme[], start: number, deleteCount: number, items: Phoneme[]): Phoneme[] {
  const _array = array.slice()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _array.splice(start, deleteCount, items)
  return _array
}

function compactSyllables(syllables: Syllable[], positionCompactLetterOnWord: number): Syllable[] {
  const _array: Syllable[] = []
  for (const syllable of syllables) {
    if (positionCompactLetterOnWord >= syllable[0] && positionCompactLetterOnWord <= syllable[1]) {
      _array.push([syllable[0], syllable[1] - 1])
    } else {
      if (positionCompactLetterOnWord < syllable[0]) {
        _array.push([syllable[0] - 1, syllable[1] - 1])
      } else {
        _array.push(syllable)
      }
    }
  }
  return _array
}

const compactSilentLetters = (silentLetters: number[], positionCompactLetterOnWord: number): number[] => {
  const _array: number[] = []
  for (const silentLetter of silentLetters) {
    if (positionCompactLetterOnWord < silentLetter) {
      _array.push(silentLetter - 1)
    } else {
      _array.push(silentLetter - 1)
    }
  }
  return _array
}

const normalizeCompactLetters = (word: string): string => {
  let normalizedWord: string = word.toLowerCase()
  compactLetters.map((compactLetter: string, index: number) => {
    if (normalizedWord.includes(compactLetter)) {
      normalizedWord = normalizedWord.replaceAll(compactLetter, compactLettersMapper[index])
    }
  })
  return normalizedWord
}

const normalizeApostrophe = (word: string): string => {
  let normalizedWord: string = word.toLowerCase()
  if (hasCommonElements(allApostrophes, normalizedWord.split(''))) {
    normalizedWord = allApostrophes.reduce((w: string, y: string) => w.replaceAll(y, "'"), normalizedWord)
  }
  return normalizedWord
}

const handleWordWithCompactLetters = (word: string, analyse: TextAnalysis): TextAnalysis => {
  const compactAnalyse: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [] }
  compactLetters.map((compactLetter: string) => {
    if (word.includes(compactLetter)) {
      const positionCompactLetterOnWord = word.indexOf(compactLetter)
      const compactedPhonemes = compactLetters.map((letter: string, index: number) => analyse.phonemes[positionCompactLetterOnWord + index])
      compactAnalyse.phonemes = compactTwoPhonemes(analyse.phonemes, positionCompactLetterOnWord, compactLetter.length + 1, compactedPhonemes)
      compactAnalyse.syllables = compactSyllables(analyse.syllables, positionCompactLetterOnWord)
      compactAnalyse.silentLetters = compactSilentLetters(analyse.silentLetters, positionCompactLetterOnWord)
    }
  })
  return compactAnalyse
}

const appendAnalyse = (analyseText: TextAnalysis, analyseWord: TextAnalysis): TextAnalysis => {
  analyseWord.syllables.map((syllable) =>
    analyseText.syllables.push([syllable[0] + analyseText.phonemes.length, syllable[1] + analyseText.phonemes.length])
  )
  analyseWord.silentLetters.map((silentLetter) => analyseText.silentLetters.push(silentLetter + analyseText.phonemes.length))
  analyseText.phonemes = analyseText.phonemes.concat(analyseWord.phonemes)
  return analyseText
}

const analyseTokenizedText = (word: string, lang: Lang): TextAnalysis => {
  let analyseText: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [] }
  const analyseWords: TextAnalysis = analyseTokenizedWord(word, lang)
  if (analyseWords.phonemes.length === 0) {
    const normalizedWords = normalizeWord(word, lang)
    if (normalizedWords.includes("'")) {
      analyseText = handleApostropheWords(normalizedWords, analyseText, lang)
    }
  } else {
    analyseText = appendAnalyse(analyseText, analyseWords)
  }
  return analyseText
}

const analyseTokenizedWord = (word: string, lang: Lang): TextAnalysis => {
  let analyse: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [] }
  let normalizedWord = normalizeWord(word, lang)
  analyse = getWordFromDictionary(normalizedWord, lang)
  if (analyse.phonemes.length === 0) {
    if (hasCommonElements(compactLetters, normalizedWord.split(''))) {
      normalizedWord = normalizeCompactLetters(normalizedWord)
      analyse = getWordFromDictionary(normalizedWord, lang)
    }
    if (analyse.phonemes.length === 0) {
      if (!normalizedWord.includes("'")) {
        word.split('').forEach(() => analyse.phonemes.push(0))
      }
    } else {
      if (hasCommonElements(compactLetters, word.split(''))) {
        analyse = handleWordWithCompactLetters(word, analyse)
      }
    }
  }
  return analyse
}

const normalizeWord = (word: string, lang: Lang): string => {
  let normalizedWord: string = word
  if (lang === 'en') {
    normalizedWord = normalizeAccentLetters(normalizedWord)
  }
  normalizedWord = normalizeApostrophe(normalizedWord)
  return normalizedWord
}

const handleEnglishApostropheWords = (words: string, analyseText: TextAnalysis): TextAnalysis => {
  words.split("'").map((word: string, index: number) => {
    const analyseWord = analyseTokenizedWord(word, 'en')
    if (index !== 0 && index < words.split("'").length) {
      analyseText.phonemes.push(0)
    }
    if (index + 1 == words.split("'").length && ['s', 'd', 'll'].includes(word)) {
      if (word === 's') {
        if (analyseText.phonemes.length !== 0) {
          analyseText = updatePhonemesSyllablesForApostropheS(words, analyseText)
        }
      } else if (word === 'd') {
        const indexOfD = analyseText.phonemes.length
        analyseText.phonemes.push(9)
        if (analyseWord.phonemes.length !== 0 && analyseText.syllables.length > 0) {
          analyseText.syllables[analyseText.syllables.length - 1][1] = indexOfD
        }
      } else if (word === 'll') {
        analyseText = updatePhonemesSyllablesForApostropheLL(analyseText)
      }
    } else {
      analyseText = appendAnalyse(analyseText, analyseWord)
    }
  })
  return analyseText
}

function handleFrenchApostropheWords(words: string, analyseText: TextAnalysis): TextAnalysis {
  let analyseApostropheWords: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [] }
  words.split("'").map((word: string, index: number) => {
    if (index !== 0 && index < words.split("'").length) {
      analyseApostropheWords.phonemes.push(0)
    }
    const analyseWord: TextAnalysis = analyseTokenizedWord(word, 'fr')
    analyseApostropheWords = appendAnalyse(analyseApostropheWords, analyseWord)
  })
  const positionApostrophe = words.indexOf("'")
  analyseApostropheWords.syllables = mergeTwoSyllables(analyseApostropheWords.syllables, positionApostrophe)
  analyseText = appendAnalyse(analyseText, analyseApostropheWords)
  return analyseText
}

function handleApostropheWords(words: string, analyseText: TextAnalysis, lang: Lang): TextAnalysis {
  if (lang === 'fr') {
    return handleFrenchApostropheWords(words, analyseText)
  }

  return handleEnglishApostropheWords(words, analyseText)
}

export { appendAnalyse, analyseTokenizedText }
