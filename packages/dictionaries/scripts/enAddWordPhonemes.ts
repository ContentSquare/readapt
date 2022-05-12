// prettier-ignore
const enPhonemes = ['aa', 'ae', 'ah', 'ao', 'aw', 'ay', 'b', 'ch', 'd', 'dh', 'eh', 'er', 'ey', 'f', 'g', 'hh', 'ih', 'iy', 'jh', 'k', 'l', 'm', 'n', 'ng', 'ow', 'oy', 'p', 'r', 's', 'sh', 't', 'th', 'uh', 'uw', 'v', 'w', 'y', 'z', 'zh']

// cmudict.formatted.corpus
const enAddWordPhonemes = (enDict: Record<string, unknown[]>) => (currentLine: string) => {
  const line = currentLine.split(' ')
  let grapheme: string[] = []
  const phoneme: (number | number[])[] = []
  line.map((char) => {
    const leftPart = char.split('}')[0]
    let rightPart = char.split('}')[1]
    rightPart = rightPart.toLowerCase()
    let rightPartPhonemes: number | number[]
    if (rightPart.includes('|')) {
      rightPartPhonemes = rightPart.split('|').map((pho) => {
        if (pho === '_') {
          return 0
        } else {
          return enPhonemes.indexOf(pho) + 1
        }
      })
    } else {
      rightPartPhonemes = enPhonemes.indexOf(rightPart) + 1
    }
    if (leftPart.includes('|')) {
      grapheme = grapheme.concat(leftPart.split('|'))
      phoneme.push(rightPartPhonemes)
    } else {
      grapheme.push(leftPart)
    }
    phoneme.push(rightPartPhonemes)
  })
  enDict[grapheme.join('')] = [phoneme, []]
  if (grapheme.length !== phoneme.length) {
    console.log('phoneme is not aligned', phoneme, phoneme.length)
  }
}

export default enAddWordPhonemes
