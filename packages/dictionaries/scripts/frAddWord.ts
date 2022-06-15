// prettier-ignore
const lexiqueInfraPhonemes = ['#', 'a', '@', 'b', 'k', 'S', 'd', '°', 'e', 'E', '2', 'f', 'g', 'N', 'gz', 'i', '5', 'Z', 'ks', 'l', 'm', 'n', 'G', 'O', 'o', '9', 'wa', '§', 'u', 'p', 'R', 's', 't', 'y', '1', 'v', 'w', 'j', 'z', 'ij', 'tS', 'dZ']

const frAddWord = (frDict: Record<string, unknown[]>) => (line: string) => {
  const phonemesIds: (number | number[])[] = []
  const phonemes: (string | string[])[] = []
  const wordEntry = line.split('	')
  const graphemes = wordEntry[0]
  wordEntry[1]
    .split('.')
    .map((l) => l.split('-'))
    .forEach((graphemePhoneme) => {
      const grapheme = graphemePhoneme[0]
      const phoneme = graphemePhoneme[1]
      if (!phoneme) {
        console.log('line=====:', line)
        return // skip entry
      }
      if (lexiqueInfraPhonemes.includes(phoneme)) {
        // one phoneme on the right side
        grapheme.split('').map(() => {
          phonemesIds.push(lexiqueInfraPhonemes.indexOf(phoneme))
          phonemes.push(phoneme)
        })
      } else {
        // more than one phoneme on the left side
        let multiplePhonemesIds: number | number[] = phoneme === '_' ? 0 : lexiqueInfraPhonemes.indexOf(phoneme)
        if (phoneme.length > 1) {
          multiplePhonemesIds = phoneme //
            .split('')
            .map((phon) => lexiqueInfraPhonemes.indexOf(phon))
        }
        const multiplePhonemes = phoneme.split('')
        grapheme.split('').map(() => {
          phonemesIds.push(multiplePhonemesIds)
          phonemes.push(multiplePhonemes)
        })
      }
    })
  // Syllables
  const syllableOutput: [number, number][] = []
  let currentIndex = 0
  const lexiqueSyllables = wordEntry[2] ? wordEntry[2].split('-') : []
  lexiqueSyllables.map((syllable) => {
    syllableOutput.push([currentIndex, currentIndex + syllable.length - 1])
    currentIndex = currentIndex + syllable.length
  })

  //SilentLetters
  const silentLettersIds = phonemes.map((pho, i) => (pho === '#' || pho.includes('/') ? i : null)).filter((i) => i !== null)

  if (silentLettersIds.length !== 0) {
    frDict[graphemes] = [phonemesIds, syllableOutput, silentLettersIds]
  } else {
    frDict[graphemes] = [phonemesIds, syllableOutput]
  }
  if (graphemes.length !== phonemesIds.length && graphemes.length !== phonemes.length) {
    console.log('graphemes', graphemes, graphemes.length)
    console.log('phonemes', phonemes, phonemes.length)
    console.log('phonemesIds', phonemesIds, phonemesIds.length)
  }
}

export default frAddWord
