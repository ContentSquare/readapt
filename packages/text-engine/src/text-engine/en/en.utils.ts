import { hasCommonElements } from '../utils'
import {
  enPhonemesForLLPhonemesContraction,
  enPhonemesForSPhonemes,
  enPhonemesForSSyllables,
  enSpecialLetters,
  enSpecialLettersMapper
} from './en.constants'
import { Phoneme, TextAnalysis } from '../models'

const normalizeAccentLetters = (word: string): string => {
  let normalizedWord: string = word.toLowerCase()
  enSpecialLetters.map((specialLetters: string, index: number) => {
    if (hasCommonElements(specialLetters.split(''), normalizedWord.split(''))) {
      normalizedWord = specialLetters
        .split('')
        .reduce(
          (currentNormalizedWord: string, letter: string) => currentNormalizedWord.replaceAll(letter, enSpecialLettersMapper[index]),
          normalizedWord
        )
    }
  })
  return normalizedWord
}

const updatePhonemesSyllablesForApostropheLL = (analyseText: TextAnalysis): TextAnalysis => {
  const lastPhonemeNotSilentLetterIndex = getLastPhonemeNotSilentLetterIndex(analyseText.phonemes)
  if (analyseText.phonemes[lastPhonemeNotSilentLetterIndex] !== 0) {
    if (analyseText.syllables.length > 0) {
      analyseText.syllables[analyseText.syllables.length - 1][1] = analyseText.syllables[analyseText.syllables.length - 1][1] + 3
    }
    if (enPhonemesForLLPhonemesContraction.includes(analyseText.phonemes[lastPhonemeNotSilentLetterIndex])) {
      analyseText.phonemes.push(21)
      analyseText.phonemes.push(21)
    } else {
      analyseText.phonemes.push(3)
      analyseText.phonemes.push(21)
    }
  } else {
    analyseText.phonemes.push(21)
    analyseText.phonemes.push(21)
  }

  return analyseText
}

const getLastPhonemeNotSilentLetterIndex = (phonemes: Phoneme[]): number => {
  const lastPhonemeNotSilentLetterIndexFromTheEnd = getLastPhonemeNotSilentLetterIndexFromTheEnd(phonemes)
  return phonemes.length - lastPhonemeNotSilentLetterIndexFromTheEnd
}

const getLastPhonemeNotSilentLetterIndexFromTheEnd = (phonemes: Phoneme[]): number => {
  let lastPhonemeNotSilentLetterIndexFromTheEnd = 0
  phonemes
    .slice()
    .reverse()
    .find((phoneme) => {
      lastPhonemeNotSilentLetterIndexFromTheEnd++
      return phoneme !== 0
    })
  return lastPhonemeNotSilentLetterIndexFromTheEnd
}

const updatePhonemesSyllablesForApostropheS = (words: string, analyseText: TextAnalysis): TextAnalysis => {
  const lastPhonemeNotSilentLetterIndexFromTheEnd = getLastPhonemeNotSilentLetterIndexFromTheEnd(analyseText.phonemes)
  const lastPhonemeNotSilentLetterIndex = analyseText.phonemes.length - lastPhonemeNotSilentLetterIndexFromTheEnd
  const lastPhoneme = analyseText.phonemes
    .slice()
    .reverse()
    .find((x) => x !== 0)
  if (analyseText.syllables.length === 0) {
    analyseText.syllables.push([words.length - 2, words.length - 1])
  } else {
    if (lastPhoneme && enPhonemesForSSyllables.includes(lastPhoneme)) {
      analyseText.syllables[analyseText.syllables.length - 1][1] = lastPhonemeNotSilentLetterIndex
      analyseText.syllables.push([lastPhonemeNotSilentLetterIndex + 1, lastPhonemeNotSilentLetterIndex + lastPhonemeNotSilentLetterIndexFromTheEnd])
    } else {
      analyseText.syllables[analyseText.syllables.length - 1][1] = analyseText.syllables[analyseText.syllables.length - 1][1] + 2
    }
  }

  if (lastPhoneme && enPhonemesForSPhonemes.includes(lastPhoneme)) {
    analyseText.phonemes.push(29)
  } else {
    analyseText.phonemes.push(38)
  }
  return analyseText
}

export { normalizeAccentLetters, getLastPhonemeNotSilentLetterIndex, updatePhonemesSyllablesForApostropheS, updatePhonemesSyllablesForApostropheLL }
