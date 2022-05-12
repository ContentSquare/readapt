import { Liaison, Syllable } from '../models'
import { getNextWord, getWordFromDictionary } from '../utils'
import { possibleLetters } from '../constants'
import {
  frExculdesLiaisonWordsCase1,
  frLiaisonSound,
  frLiaisonWordsCase1,
  frPossibleWordAfterHiatus,
  specialCharNotBreakingLiaison,
  vowels
} from './fr.constants'

const findFrenchLiaison = (text: string, word: string, index: number): Liaison | undefined => {
  if (!isLiaisonWord(word) || theNextCharBreakLiaison(text, index)) {
    return
  }
  const nextWord = getNextWord(text, index)
  const indexOfNextWord = getIndexOfNextWord(text, index)
  let hasLiaison = false

  if (vowels.includes(nextWord[0].toLowerCase()) && !frExculdesLiaisonWordsCase1.includes(nextWord)) {
    hasLiaison = true
  }
  if (nextWord && nextWord[0].toLowerCase() === 'h') {
    const dictionaryValue = getWordFromDictionary(nextWord, 'fr')
    // h could be -1 or 0. to have a liaisons h phoneme should be 0
    if (dictionaryValue.phonemes.length > 0 && dictionaryValue.phonemes[0] === 0) {
      hasLiaison = true
    }
  }
  if (nextWord === 'y' || nextWord === 'yeux') {
    hasLiaison = true
  }

  if (hasLiaison) {
    return [index - 1, indexOfNextWord, frLiaisonSound.get(word[word.length - 1])]
  }

  return undefined
}

const isLiaisonWord = (word: string) => {
  return frLiaisonWordsCase1.includes(word.toLowerCase())
}

const theNextCharBreakLiaison = (text: string, index: number): boolean => {
  let breakLiaison = false
  for (let i = index; i <= text.length; i++) {
    if (possibleLetters.includes(text[i])) {
      break
    }
    if (!specialCharNotBreakingLiaison.includes(text[i])) {
      breakLiaison = true
    }
  }
  return breakLiaison
}

const getIndexOfNextWord = (text: string, index: number): number => {
  let indexOfNextWord: number = index
  for (let i = index; i <= text.length; i++) {
    indexOfNextWord = i
    if (possibleLetters.includes(text[i])) {
      break
    }
  }
  return indexOfNextWord
}

const handleFrenchHiatusSyllables = (text: string, syllables: Syllable[]): Syllable[] => {
  if (text.toLowerCase().includes('-t-')) {
    const indices = getIndicesOf(text.toLowerCase(), '-t-')
    for (const index of indices) {
      let hiatusWord = ''
      for (let i = index + 3; i < text.length && text[i] !== ' '; i++) {
        hiatusWord += text[i]
      }
      if (frPossibleWordAfterHiatus.includes(hiatusWord)) {
        syllables = mergeTwoSyllables(syllables, index + 3)
      }
    }
  }
  return syllables
}

const getIndicesOf = (text: string, stringToFind: string): number[] => {
  if (!text || !stringToFind) {
    return []
  }
  const indices: number[] = []
  let i = 0
  while (i < text.length) {
    if (text.substring(i, i + stringToFind.length) == stringToFind) {
      indices.push(i)
      i += stringToFind.length
    } else {
      i++
    }
  }
  return indices
}

const mergeTwoSyllables = (syllables: Syllable[], position: number): Syllable[] => {
  if (syllables.length > 1) {
    syllables = syllables.filter(([posInit, posEnd], index) => {
      const nextSyllable = syllables[index + 1]
      if (position >= posEnd && nextSyllable && position <= nextSyllable[0]) {
        nextSyllable[0] = posInit
        return false
      }
      return true
    })
  }
  return syllables
}

export { findFrenchLiaison, handleFrenchHiatusSyllables, mergeTwoSyllables }
