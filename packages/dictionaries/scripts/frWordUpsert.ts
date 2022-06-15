import upsertWord from './upsertWord'

const frWordUpsert = (frDict: Record<string, unknown[]>) => {
  // prettier-ignore
  const frPhonemes = ['_', 'a', 'an', 'b', 'c', 'ch', 'd', 'e', 'é', 'è', 'eu', 'f', 'g', 'gn', 'gz', 'i', 'in', 'j', 'ks', 'l', 'm', 'n', 'ng', 'o', 'ô', 'oeu', 'oi', 'on', 'ou', 'p', 'r', 's', 't', 'u', 'un', 'v', 'w', 'y', 'z', 'iy', 'tch', 'dg']
  return upsertWord(frPhonemes, frDict)
}

export default frWordUpsert
