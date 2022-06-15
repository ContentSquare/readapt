/**
 * Result of a text analysis
 *
 * @see {@link Phoneme}
 * @see {@link Syllable}
 * @see {@link Liaison}
 * @public
 */
export interface TextAnalysis {
  /** {@link Phoneme} */
  phonemes: Phoneme[]
  /** {@link Syllable} */
  syllables: Syllable[]
  silentLetters: number[]
  /** {@link Liaison} only when lang is fr */
  liaisons?: Liaison[]
}

/**
 * A Liaison is composed by start index, end index, and liaison phoneme.
 *
 * @example "les amis" sentence has a liaison [2, 4, "z"]
 * @public
 */
export type Liaison = [number, number, string]

/**
 * A Syllable is represented as a tuple [startIndex, endIndex]
 * @example in the word "hello" syllables are: [0, 2] and [3, 4]
 * @public
 */
export type Syllable = [number, number]

/**
 * A Phoneme is represented by a phoneme index or in some cases a tuple of two phonemes index.
 * A phoneme index is their position in the phonemes list of the lang.
 */
export type Phoneme = number | [number, number]

/**
 * Available Languages
 */
export type Lang = 'en' | 'fr'

/**
 * Used to analise a text in a specified Lang
 *
 * @see available Lang {@link Lang}
 *
 * @param {string} text - text to be analysed
 * @param {Lang} lang - lang to be used to analyse the text
 *
 * @public
 *
 * @returns {TextAnalysis} the result of text analysis
 *
 * @example
 *
 * ```typescript
 * const analyseResult = analyse('hello', 'en')
 * ```
 * ```json
 * // Output =>
 * {
 *    phonemes: [16, 3, 21, 21, 15],
 *    syllables: [[0, 2], [3, 4]]
 * }
 * ```
 */
export type AnaliseTextFn = (text: string, lang: Lang) => TextAnalysis
