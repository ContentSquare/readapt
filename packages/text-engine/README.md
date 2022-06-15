# @readapt/text-engine

## Installation

### npm

1. Install @readapt/text-engine package:

```bash
     npm install @readapt/text-engine
```

## Usage

#### Directly in your browser add script

    <script src="path/to/yourCopyOf/readapt-text-engine.browser.js"></script>

This script add the variable `textEngine` on the browser global scope.

#### node (babel, typescript)

Import entire module

    import * as TextEngine from '@readapt/text-engine'

or individually

    import { analyse, getPhonemes } from '@readapt/text-engine'

### node (cjs)

Entire module

    const textEngine = require('@readapt/text-engine')

or

    const { analyse, getPhonemes } = require('@readapt/text-engine')

### Text Analyse

For example analyse the sentence *salut les amies*:

    const textAnalysis = analyse('salut les amies!', 'fr')

    Output:
    {
      phonemes:      [  31, 1, 19, 33,  0, 0, 19, 8, 0, 0, 1, 20, 15, 0, 0, 0, 0],
      syllables:     [ [ 0, 1 ], [ 2, 4 ], [ 6, 8 ], [ 10, 10 ], [ 11, 14 ] ],
      silentLetters: [ 4, 8, 13, 14 ],
      liaison:       [ [ 8, 10, 'z' ] ] // only when lang is fr
    }

|Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
|---| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|*Text*| s | a | l | u | t |   | l | e | s |  | a | m | i | e | s | | ! |
|*Phonemes*| 31 | 1 | 19 | 33 | 0 | 0 | 19 | 8 | 0 | 0 | 1 | 20 | 15 | 0 | 0 | 0| 0|
|*Syllables*| [ | ] | [ |  | ] |  | [ |  | ] |  |\[ \] | [ |  |  | ] | | |
|*SilentLetters*|  |  | |  | ✓ |  |  |  | ✓️ |  | |  |  | ✓ | ✓️ | | |
|*Liaisons*|  |  | |  |  |  |  |  | *z* | **‿** |  |  |  |  |  | | |

Get `fr` language phonemes list

    const frPhonemes = getPhonemes('fr')

    // Output
    // [ '_',  'a', 'an', 'b',  'c', 'ch', ... , 'w',  'y',   'z',  'iy', 'tch', 'dg']

Then you can map the phonemes of the sentence with the phonemes of the lang

    const phonemes = textAnalysis.phonemes.map(index => frPhonemes[index])

    // Output
    // [ 's', 'a', 'l', 'u', '_', '_', 'l', 'é', '_', '_', 'a', 'm', 'i', '_', '_', '_']

    const textPhonemes = phonemes.join(' ')

    // Output
    // s a l u _ _ l é _ _ a m i _ _ _

To determine full pronunciation you need to add the liaisons if they are present

    // salu lé ami
    //       z‿
    // with liaisons

In English the analysis is very similar but without the field `liaisons`.

Some words are more than one phoneme in this case the phonemes array may be contain a tuple of phonemes.

For example analyse the sentence *John was subtle*:

    const textAnalysisEn = analyse('John was subtle', 'en')

    Output:
    {
      phonemes:      [ 19, 1, 0, 23, 0, 36, 1, 38, 0, 29, 3, 3, 31, [3, 21], 0 ],
      syllables:     [ [0, 3], [5, 7], [9, 11], [12, 14] ],
      silentLetters: [2, 11]
    }

|Index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14
|---| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|*Text*|J| o | h | n | | w | a | s | | s | u | b | t | l | e |
|*Phonemes*|19| 1 | 0 | 23 | 0 | 36 | 1 | 38 | 0 | 29 | 3 | 3 | 31 | **\[3,21\]** | 0 |
|*SilentLetters*|  |  | ✓ |  |  |  |  |  |  |  |  | ✓ |  |  |  |

The sentence above, the grapheme `l` has two phonemes ('ah', and 'l'). In this case the mapping phoneme index to phoneme
is a bit different because you need to call flat() first.

    const enPhonemes = getPhonemes('en')

    const phonemes = textAnalysisEn.phonemes.flat().map((index => enPhonemes[index]).join(' ')

    // Output:
    // jh aa _ n _ w aa z _ s ah ah t ah l _'
