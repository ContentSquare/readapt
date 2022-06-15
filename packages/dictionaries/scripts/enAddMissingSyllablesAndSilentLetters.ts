const addEnMissingSyllablesAndSilentLetters = (enDict: Record<string, unknown[]>) => (line: string) => {
  const parts = line.split('	').filter((n) => n)
  const word = parts[0]
  const syllables = parts[1].split('/')
  const syllableOutput: [number, number][] = []
  let currentIndex = 0
  syllables.forEach((syllable) => {
    syllableOutput.push([currentIndex, currentIndex + syllable.length - 1])
    currentIndex = currentIndex + syllable.length
  })

  if (enDict[word]) {
    enDict[word][1] = syllableOutput
    const hasSilentLetters = parts.length === 3
    if (hasSilentLetters) {
      const silentLetters = parts[2]
        .split(',')
        .filter((n) => parseInt(n))
        .map((n) => parseInt(n))
      enDict[word][2] = silentLetters
    }
  } else {
    console.log('Error This word doest exists :', word)
  }
}

export default addEnMissingSyllablesAndSilentLetters
