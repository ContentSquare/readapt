const SYLLABLE_SEPARATOR = '/'
const PHONEME_SEPARATOR = '.'

const upsertWord = (langPhonemes: string[], langDict: Record<string, unknown[]>) => (line: string) => {
  const [word, analysis] = line.split(',')

  const syllables = analysis
    .split(SYLLABLE_SEPARATOR) //
    .reduce((endPositions: number[], syllable) => {
      const syllableLength = syllable.split(PHONEME_SEPARATOR).length
      if (endPositions.length === 0) {
        endPositions.push(syllableLength - 1)
      } else {
        const lastElemPosition = endPositions[endPositions.length - 1]
        endPositions.push(lastElemPosition + syllableLength)
      }
      return endPositions
    }, [])
    .map((endPosition, index, syllablesEndPositions) => {
      if (index === 0) {
        return [0, endPosition]
      }
      return [syllablesEndPositions[index - 1] + 1, endPosition]
    })

  const phonemes = analysis //
    .replace(new RegExp(SYLLABLE_SEPARATOR, 'g'), PHONEME_SEPARATOR)
    .split(PHONEME_SEPARATOR)
    .map((phoneme) => {
      const phonemes = phoneme.split('|')
      if (phonemes.length === 1) {
        return langPhonemes.indexOf(phoneme)
      }
      return phonemes.map((phoneme) => langPhonemes.indexOf(phoneme))
    })

  const silentLetters = phonemes //
    .map((item, position) => (item > 0 ? undefined : position))
    .filter((item) => item !== undefined)

  langDict[word] = buildWordAnalysis(phonemes, syllables, silentLetters)
}

const buildWordAnalysis = (phonemes: unknown, syllables: unknown, silentLetters: unknown[]) => {
  if (silentLetters.length > 0) {
    return [phonemes, syllables, silentLetters]
  }
  return [phonemes, syllables]
}

export default upsertWord
