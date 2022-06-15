const fs = require('fs')
const nlp = require('nlp_compromise')
const nlpSyllables = require('nlp-syllables')
nlp.plugin(nlpSyllables)

const easyReadingDictFile = 'data/easyReadingDict.json'

let easyReadingDict = fs.readFileSync(easyReadingDictFile)
easyReadingDict = JSON.parse(easyReadingDict)

Object.keys(easyReadingDict).forEach((key) => {
  if (easyReadingDict[key] && easyReadingDict[key][1].length === 0) {
    // console.log(nlp.term(key).syllables());
    fs.appendFileSync('results/missingSyllables.txt', key + ':' + JSON.stringify(nlp.term(key).syllables()) + ',\n')
  }
})
