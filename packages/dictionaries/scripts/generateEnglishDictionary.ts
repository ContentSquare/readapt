import * as fs from 'fs'
import * as path from 'path'

import ingestSource from './ingestSource'
import enAddWordPhonemes from './enAddWordPhonemes'
import enAddWordSyllables from './enAddWordSyllables'
import enAddSilentLetters from './enAddSilentLetters'
import enAddMissingSyllablesAndSilentLetters from './enAddMissingSyllablesAndSilentLetters'
import enCheckPhonemes from './enCheckPhonemes'
import enAddMissingWords from './enAddMissingWords'
import enWordUpsert from './enWordUpsert'

const generateEnDict = ingestSource('cmudict.formatted.corpus', enAddWordPhonemes, 'Add Word Phonemes')
console.log('Generating english dictionary...')

generateEnDict({})
  .then(ingestSource('enSyllables.txt', enAddWordSyllables, 'Add syllables'))
  .then(ingestSource('enSilentLetters.txt', enAddSilentLetters, 'Add missing silent letters'))
  .then(ingestSource('addMissingSyllablesAndUpdateSilent.txt', enAddMissingSyllablesAndSilentLetters, 'Add remaining syllables and silent letters'))
  .then(enAddMissingWords)
  .then(ingestSource('enUpdate.csv', enWordUpsert, 'Upsert en words'))
  .then((enDict) => fs.writeFileSync(path.join(__dirname, '../src/en/en.json'), JSON.stringify(enDict)))
  .then(enCheckPhonemes)
