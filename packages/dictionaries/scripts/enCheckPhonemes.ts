import * as fs from 'fs'
import * as path from 'path'

const enCheckPhonemes = () => {
  const enDictPath = path.join(__dirname, '../src/en/en.json')
  const enDict: Record<string, unknown[][]> = JSON.parse(fs.readFileSync(enDictPath).toString())

  const entries = Object.entries(enDict)
  entries.forEach(([key, value]) => {
    if (key.length !== value[0].length) {
      console.log('Not aligned phonemes:', key)
    }
  })
}

export default enCheckPhonemes
