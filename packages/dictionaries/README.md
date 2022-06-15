# @readapt/dictionaries

### Generate dictionaries

To regenerate dictionaries run scripts (only need if sources in `/data` changes)

```bash
# generate fr dictionary
yarn generate-fr-dict
# updates src/en/en.json file

# generate en dictionary
yarn generate-en-dict
# updates src/fr/fr.json file
```

### Update dictionaries

Updates can be done by adding words in `scripts/data/enUpdate.csv` for English and `scripts/data/frUpdate.csv` for French.
A new word will be added or overridden if word already exists.

Accepted format is `Word,WordAnalysis` where Word is the word in lowercase and WordAnalysis is the phonetic transcription
where syllables are separated by `/` and phonemes are separated by `.`

Example of line for the word `malvoyant` in French:

    malvoyant,m.a.l/v.oi/y.an.an._

Silent letters uses `_` phoneme. Special phoneme `#` is used to signify a non-aspirated h ("h aspiré") where the French
liaison is not permitted.

If a letter has more than one phoneme, phonemes are separated by the symbol `|`

Example of a word with more than one phoneme in a letter

    prism,p.r.ih.z|ah/m

Regenerate dictionary and rebuild it running `yarn build` to take updates account.

### Word structure

Each dictionary is a JSON Object which maps each word with their WordAnalysis

A WordAnalysis is an array with 2 or 3 items

* Phoneme index (aligned with graphemes)
* Syllable positions
* Silent letter positions (if needed)

For example the analysis of the word "thoughtful" is :

```javascript
{
  "thoughtful": [
    // phonemes index aligned with graphemes index
    // th(32) - ao(4) - t(31) - f(14) - ah(3) - l(21)
    // t,  h, o, u, g, h,  t,  f, u, l
    [ 32, 32, 4, 4, 0, 0, 31, 14, 3, 21 ],
    // syllables positions
    [ [ 0, 6 ], [ 7, 9 ] ], // thought/ful
    // silent letter positions
    [ 4, 5 ] // 'gh'
  ]
}
```
