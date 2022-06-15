import * as fs from 'fs'
import * as path from 'path'

import ingestSource from './ingestSource'
import frAddWord from './frAddWord'
import frWordUpsert from './frWordUpsert'

const generateFrDict = ingestSource('lexique-infra.brut', frAddWord, 'Add fr words')

console.log('Generating french dictionary...')
generateFrDict({}) //
  .then(ingestSource('frUpdate.csv', frWordUpsert, 'Upsert fr words'))
  .then((frDict) => fs.writeFileSync(path.join(__dirname, '../src/fr/fr.json'), JSON.stringify(frDict)))
