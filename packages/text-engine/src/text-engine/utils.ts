import { enDict } from '@readapt/dictionaries/dist/en'
import { frDict } from '@readapt/dictionaries/dist/fr'

import { Lang, TextAnalysis } from './models'
import { possibleLetters } from './constants'

const getWordFromDictionary = (word: string, lang: Lang): TextAnalysis => {
  const analyse: TextAnalysis = { phonemes: [], syllables: [], silentLetters: [] }
  if (!word) {
    return analyse
  }

  word = word.toLowerCase()
  const dictionary = lang === 'fr' ? frDict : enDict
  const dictValue = dictionary[word.toLowerCase()]
  if (dictValue) {
    analyse.phonemes = dictValue[0].slice()
    analyse.syllables = dictValue[1].slice()
    analyse.silentLetters = dictValue[2] ? dictValue[2].slice() : []
  }

  return analyse
}

const getNextWord = (text: string, index: number): string => {
  let nextWord = ''
  for (let i = index; i <= text.length; i++) {
    if (possibleLetters.includes(text[i])) {
      nextWord = nextWord.concat(text[i])
    } else {
      if (nextWord.length !== 0) {
        break
      }
    }
  }
  return nextWord
}

const hasCommonElements = <T>(arr1: T[], arr2: T[]): boolean => {
  return arr1.some((item: T) => arr2.includes(item))
}

export { getWordFromDictionary, getNextWord, hasCommonElements }
