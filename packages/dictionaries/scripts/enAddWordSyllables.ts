// line ingest of enSyllables.txt
const enAddWordSyllables = (enDict: Record<string, unknown[]>) => (line: string) => {
  const [mobyWord, mobySyllables] = line.split('	')
  const word = mobyWord.toLowerCase()
  const syllables = mobySyllables.split('•')
  const syllableOutput: number[][] = []
  let currentIndex = 0
  syllables.map((syllable) => {
    syllableOutput.push([currentIndex, currentIndex + syllable.length - 1])
    currentIndex = currentIndex + syllable.length
  })
  if (enDict[word]) {
    enDict[word][1] = syllableOutput
  }
}

export default enAddWordSyllables
