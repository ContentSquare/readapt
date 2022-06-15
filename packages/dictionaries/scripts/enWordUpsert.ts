import upsertWord from './upsertWord'

const enWordUpsert = (frDict: Record<string, unknown[]>) => {
  // prettier-ignore
  const enPhonemes = ['_', 'aa', 'ae', 'ah', 'ao', 'aw', 'ay', 'b', 'ch', 'd', 'dh', 'eh', 'er', 'ey', 'f', 'g', 'hh', 'ih', 'iy', 'jh', 'k', 'l', 'm', 'n', 'ng', 'ow', 'oy', 'p', 'r', 's', 'sh', 't', 'th', 'uh', 'uw', 'v', 'w', 'y', 'z', 'zh']

  return upsertWord(enPhonemes, frDict)
}

export default enWordUpsert
