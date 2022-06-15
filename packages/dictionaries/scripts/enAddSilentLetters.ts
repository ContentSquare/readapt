const enAddSilentLetters = (enDict: Record<string, unknown[]>) => (line: string) => {
  const [silentLetterWord, silentLetterIndex] = line.split('	')
  if (enDict[silentLetterWord]) {
    enDict[silentLetterWord].push(JSON.parse(silentLetterIndex))
  }
}

export default enAddSilentLetters
