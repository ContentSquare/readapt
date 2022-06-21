import * as textEngine from '../src/text-engine/text-engine'
import { Phoneme } from '../src'

describe('English TextEngine', () => {
  const enPhonemes = textEngine.getPhonemes('en')
  const mapEnPhonemes = (phonemes: Phoneme[]) =>
    phonemes.map((phoneme) => (Array.isArray(phoneme) ? phoneme.map((index) => enPhonemes[index]).join('|') : enPhonemes[phoneme])).join('.')

  it('should return treat hyphenated words separately (set, up)', () => {
    const text = 'set-up'
    const lang = 'en'
    const expectedPhonemes = 's.eh.t._.ah.p'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [4, 5]]
    const expectedSilentLettersValue: number[] = []

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should not return liaisons when lang is english', () => {
    const lang = 'en'
    const text = 'no liaisons'

    const { phonemes, liaisons } = textEngine.analyse(text, lang)

    expect(liaisons).toBeUndefined()
    expect(mapEnPhonemes(phonemes)).toBe('n.ow._.l.iy.ey.ey.s.aa.n.z')
  })

  it('should return the correct indexes silent letters (John, subtle)', () => {
    const text = 'John was subtle'
    const lang = 'en'
    const expectedPhonemes = 'jh.aa._.n._.w.aa.z._.s.ah.ah.t.ah|l._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 7], [9, 11], [12, 14]]
    const expectedSilentLettersValue = [2, 11]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return the correct indexes silent letters (John, listening, Christmas, whistling)', () => {
    const text = 'John is listening to Christmas whistling'
    const lang = 'en'
    const expectedPhonemes = 'jh.aa._.n._.ih.z._.l.ih.s._.ah.n.ih.ng.ng._.t.uw._.k._.r.ih.s._.m.ah.s._.w._.ih.s._.l.ih.ng.ng'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 6], [8, 10], [11, 12], [13, 16], [18, 19], [21, 26], [27, 29], [31, 34], [35, 39]]
    const expectedSilentLettersValue = [2, 11, 22, 26, 32, 35]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should be able to handle words that don t exist in the dictionary', () => {
    const text = 'fantasmo city. U can wackas FYI.'
    const lang = 'en'
    const expectedPhonemes = '_._._._._._._._._.s.ih.t.iy._._.y|uw._.k.ae.n._._._._._._._._.eh|f.w|ay.ay._'
    // prettier-ignore
    const expectedSyllablesValue = [[9, 11], [12, 12], [15, 15], [17, 19], [28, 28], [29, 29], [30, 30]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toStrictEqual(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it('should be able to handle sentence with symbols', () => {
    const text =
      "This is an (example) sentence. What an #awesome word it is. It's fantastic/amazing & beautiful! 100% incredible! The sky is blue-ish"
    const lang = 'en'
    const expectedPhonemes =
      'dh.dh.ih.s._.ih.z._.ae.n._._.ih.g|z.ae.m.p.ah|l._._._.s.eh.n.t.ah.n.s._._._.w._.ah.t._.ae.n._._.ao.ao._.s.ah.m._._.w.er.er.d._.ih.t._.ih.z._._.ih.t._.s._.f.ae.n.t.ae.s.t.ih.k._.ah.m.ey.z.ih.ng.ng._._._.b._.y.uw.t.ah.f.ah.l._._._._._._._.ih.n.k.r.eh.d.ah.b.ah|l._._._.dh.dh.ah._.s.k.ay._.ih.z._.b.l.uw._._.ih.sh.sh'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 6], [8, 9], [12, 13], [14, 15], [16, 18], [21, 23], [24, 28], [31, 34], [36, 37], [40, 42], [43, 46], [48, 51], [53, 54], [56, 57], [60, 63], [65, 67], [68, 70], [71, 73], [75, 75], [76, 78], [79, 81], [85, 88], [89, 90], [91, 93], [101, 102], [103, 106], [107, 107], [108, 110], [113, 115], [117, 119], [121, 122], [124, 127], [129, 131]]
    const expectedSilentLettersValue = [32]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })
  it('should return english analysis for contraction words entirly exists in dictionary', () => {
    const text = "rock'n'roll rock's dog's"
    const lang = 'en'
    const expectedPhonemes = 'r.aa.k.k.ah.n._.r.ow.l.l._.r.aa.k.k._.s._.d.ao.g.z.z'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [4, 6], [7, 10], [12, 17], [19, 23]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it('should return english analysis when the entire word not exists in dictionary but the splitted words exists in dictionary', () => {
    const text = "jut's cleo's farouk's fridge's taze's"
    const lang = 'en'
    const expectedPhonemes = 'jh.ah.t._.s._.k.l.iy.ow._.z._.f.ah.r.uw.uw.k._.s._.f.r.ih.jh.jh._._.z._._._._._._.z'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 4], [6, 8], [9, 11], [13, 14], [15, 20], [22, 26], [27, 29], [35, 36]]
    const expectedSilentLettersValue = [25]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return english analysis for contraction with different kind of apostrophe', () => {
    const text = "'twas Taze's. band’s girl’s. Jeff’s, The kebab’s"
    const lang = 'en'
    const expectedPhonemes = '_.t.w.ah.z._._._._._._.z._._.b.ae.n.d.z.z._.g.er.er.l.z.z._._.jh.eh.f.f._.s._._.dh.dh.ah._.k.ah.b.aa.b._.z'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 4], [10, 11], [14, 19], [21, 26], [29, 34], [37, 39], [41, 42], [43, 47]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it("should return be able to handle contractions 'xx'yyy''dd'x", () => {
    const text = "'round''farouk's taze'd farouk'd"
    const lang = 'en'
    const expectedPhonemes = '_.r.aw.aw.n.d._._.f.ah.r.uw.uw.k._.s._._._._._._.d._.f.ah.r.uw.uw.k._.d'
    // prettier-ignore
    const expectedSyllablesValue = [[1, 5], [8, 9], [10, 15], [24, 25], [26, 31]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it('should return be able to handle contractions ll vs d', () => {
    const text = "'round abbey's Farouk'd dog'll Taze'll rock'n'roll"
    const lang = 'en'
    const expectedPhonemes = '_.r.aw.aw.n.d._.ae.b.b._.iy.z.z._.f.ah.r.uw.uw.k._.d._.d.ao.g._.ah.l._._._._._._.l.l._.r.aa.k.k.ah.n._.r.ow.l.l'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 5], [7, 8], [9, 13], [15, 16], [17, 22], [24, 29], [39, 42], [43, 45], [46, 49]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })
  it('should be able to handle contractions syllables for ll vs d', () => {
    const text = "farouk'll farouk'd"
    const lang = 'en'
    const expectedPhonemes = 'f.ah.r.uw.uw.k._.ah.l._.f.ah.r.uw.uw.k._.d'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 1], [2, 8], [10, 11], [12, 17]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })
  it('should return be able to handle contractions ll', () => {
    const text = "Natacha'll law'll carla'll death'll bev'll"
    const lang = 'en'
    const expectedPhonemes = '_._._._._._._._.l.l._.l.ao.ao._.l.l._.k.aa.r.l.aa._.l.l._.d._.eh.th.th._.ah.l._.b.eh.v._.ah.l'
    // prettier-ignore
    const expectedSyllablesValue = [[11, 16], [18, 20], [21, 25], [27, 34], [36, 41]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it('should return be able to handle contractions phoneme "S" vs "Z" for not recognized word', () => {
    const text = "taze's"
    const lang = 'en'
    const expectedPhonemes = '_._._._._.z'
    const expectedSyllablesValue = [[4, 5]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })
  it('should return be able to handle contractions phoneme "S" vs "Z"', () => {
    const text = "Natacha's pig's beach's sand's fridge's"
    const lang = 'en'
    const expectedPhonemes = '_._._._._._._._.z._.p.ih.g.z.z._.b.iy.iy.ch.ch.ah.z._.s.ae.n.d.z.z._.f.r.ih.jh.jh._._.z'
    // prettier-ignore
    const expectedSyllablesValue = [[7, 8], [10, 14], [16, 20], [21, 22], [24, 29], [31, 35], [36, 38]]
    const expectedSilentLettersValue = [34]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should be able to handle words surrounding the hyphen are treated separately', () => {
    const text = 'english-speaking. pick-up runner-up non-descript'
    const lang = 'en'
    const expectedPhonemes = 'ih.ng.g.l.ih.sh.sh._.s.p.iy.iy.k.ih.ng.ng._._.p.ih.k.k._.ah.p._.r.ah.n.n.er.er._.ah.p._.n.aa.n._._._._._._._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [3, 6], [8, 12], [13, 15], [18, 21], [23, 24], [26, 28], [29, 31], [33, 34], [36, 38]]
    const expectedSilentLettersValue: number[] = []

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should be able to handle letters with accents are treated as their root letters and compacted letters', () => {
    const text = "subtle's café naïve vitæ archæology's xxdfd'ssttt rock'n'roll"
    const lang = 'en'
    const expectedPhonemes =
      's.ah.ah.t.ah|l._._.z._.k.ah.f.ey._.n.ay.iy.v._._.v.ay.t.ah|_._.aa.r.k._._|iy.aa.l.ah.jh.iy._.z._._._._._._._._._._._._._.r.aa.k.k.ah.n._.r.ow.l.l'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [3, 7], [9, 10], [11, 12], [14, 15], [16, 18], [20, 21], [22, 23], [25, 26], [27, 29], [30, 31], [32, 32], [33, 36], [50, 53], [54, 56], [57, 60]]
    const expectedSilentLettersValue = [2, 27]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should be able to handle words with compact letters', () => {
    const text = 'fœhn vitæ, mœurs  æschne'
    const lang = 'en'
    const expectedPhonemes = '_._._._._.v.ay.t.ah|_._._._._._._._._._._._._._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[5, 6], [7, 8]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapEnPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })
})

describe('French TextEngine', () => {
  const frPhonemes = textEngine.getPhonemes('fr')
  const mapFrPhonemes = (phonemes: Phoneme[]) =>
    phonemes.map((phoneme) => (Array.isArray(phoneme) ? phoneme.map((index) => frPhonemes[index]).join('|') : frPhonemes[phoneme])).join('.')

  it('should return correct phonemes and silent letters for simple sentence', () => {
    const text = 'Bonjour Tout le     monde!'
    const lang = 'fr'
    const expectedPhonemes = 'b.on.on.j.ou.ou.r._.t.ou.ou._._.l.e._._._._._.m.on.on.d._._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [3, 6], [8, 11], [13, 14], [20, 22], [23, 24]]
    const expectedSilentLettersValue = [11, 24]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should keep spaces between words', () => {
    const text = 'Tu aimes    lire'
    const lang = 'fr'
    const expectedPhonemes = 't.u._.è.è.m._._._._._._.l.i.r._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 1], [3, 4], [5, 7], [12, 13], [14, 15]]
    const expectedSilentLettersValue = [6, 7, 15]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should  make distinction between i and j & ij  phonemes', () => {
    const text = 'Vous voudriez venir voir les abeilles?'
    const lang = 'fr'
    const expectedPhonemes = 'v.ou.ou._._.v.ou.ou.d.r.iy.é.é._.v.e.n.i.r._.v.oi.oi.r._.l.é._._.a.b.è.è.y.y._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 7], [8, 12], [14, 15], [16, 18], [20, 23], [25, 27], [29, 29], [30, 33], [34, 36]]
    const expectedSilentLettersValue = [3, 27, 35, 36]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should  make distinction between d and Z & dZ phonemes', () => {
    const text = "Les gens aiment le jogging, c'est dingue, non?"
    const lang = 'fr'
    const expectedPhonemes = 'l.é._._.j.an.an._._.è.è.m._._._._.l.e._.dg.o.g.g.i.ng.ng._._.s._.é._._._.d.in.in.g.g._._._.n.on.on._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [4, 7], [9, 10], [11, 14], [16, 17], [19, 21], [22, 25], [28, 32], [34, 36], [37, 39], [42, 44]]
    const expectedSilentLettersValue = [2, 7, 12, 13, 14, 31, 32, 39]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should make distinction between  t and S & tS phonemes', () => {
    const text = 'Ciao chaton!'
    const lang = 'fr'
    const expectedPhonemes = 'tch._.a.ô._.ch.ch.a.t.on.on._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 7], [8, 10]]
    const expectedSilentLettersValue = [1]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should treat only the following words: j, aime, lire, on, se, voit, oui', () => {
    const text = "J'aime #lire. On se voit @ 14h? Oui!!!~~~|"
    const lang = 'fr'
    const expectedPhonemes = 'j._.è.è.m._._._.l.i.r._._._.on.on._.s.e._.v.oi.oi._._._._._._._._._.w.w.i._._._._._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [4, 5], [8, 9], [10, 11], [14, 15], [17, 18], [20, 23], [32, 34]]
    const expectedSilentLettersValue = [5, 11, 23]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return skips for word that don t exists in dictionary', () => {
    const text = 'Taze est né à Sydney'
    const lang = 'fr'
    const expectedPhonemes = '_._._._._.é._._._.n.é._.a._._._._._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[5, 7], [9, 10], [12, 12]]
    const expectedSilentLettersValue = [6, 7]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return analysis for word with apostrophe entirety exists in dictionary', () => {
    const text = "aujourd'hui on a d'autres ch'timis"
    const lang = 'fr'
    const expectedPhonemes = 'ô.ô.j.ou.ou.r.d._._.u.i._.on.on._.a._.d._.ô.ô.t.r._._._.ch.ch._.t.i.m.i._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 1], [2, 5], [6, 10], [12, 13], [15, 15], [17, 20], [21, 24], [26, 28], [29, 30], [31, 33]]
    const expectedSilentLettersValue = [8, 23, 24, 33]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return merged syllables between two splitted words exists in dictionary with apostrophe  ', () => {
    const text = "jusqu'hier j'aime j'invite j'arrange qu'robert"
    const lang = 'fr'
    const expectedPhonemes = 'j.u.s.c.c._..y.è.r._.j._.è.è.m._._.j._.in.in.v.i.t._._.j._.a.r.r.an.an.j.j._.c.c._.r.ô.b.è.r._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 2], [3, 9], [11, 14], [15, 16], [18, 21], [22, 23], [24, 25], [27, 30], [31, 33], [34, 35], [37, 41], [42, 45]]
    const expectedSilentLettersValue = [6, 16, 25, 45]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should not merge syllables when the word has an apostrophe at the end but has not a next word to merge with', () => {
    const text = "'le process'"
    const lang = 'fr'
    const expectedPhonemes = '_.l.e._.p.r.o.s.è.s.s._'
    // prettier-ignore
    const expectedSyllables =[[1, 2], [4, 6], [7, 10]]
    const expectedSilentLetters: number[] = []

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllables)
    expect(silentLetters).toStrictEqual(expectedSilentLetters)
  })

  it('should return analysis for word with apostrophe splitted not exists in dictionary', () => {
    const text = "Tato'toti mika'mamko banko'sank."
    const lang = 'fr'
    const expectedPhonemes = '_._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._._'
    const expectedSyllablesValue: number[][] = []
    const expectedSilentLettersValue: number[] = []

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return analysis for word with compact letters', () => {
    const text = 'fœhn  fœhn vitæ, œil, bœuf, œillère, sœur, œuf, œillet, œuvre, mœurs  æschne'
    const lang = 'fr'
    const expectedPhonemes =
      'f.eu|eu._.n._._.f.eu|eu._.n._._._._._._._.oeu|oeu.y.y._._.b.oeu|oeu.oeu.f._._.oeu|oeu.y.y.y.è.r._._._.s.oeu|oeu.oeu.r._._.oeu|oeu.oeu.f._._.oeu|oeu.y.y.y.è.è._._.oeu|oeu.oeu.v.r._._._.m.oeu|oeu.oeu.r.s._._._._._._._._'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [6, 9], [17, 19], [22, 25], [28, 30], [31, 32], [33, 34], [37, 40], [43, 45], [48, 50], [51, 53], [56, 57], [58, 60], [63, 67]]
    const expectedSilentLettersValue = [2, 8, 34, 60]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return analysis for Hiatus word', () => {
    const text = 'x-t-ellesse va-t-il peux-T-on va-t-elles va-t-on va-t-en'
    const lang = 'fr'
    const expectedPhonemes = '_._.t._._._._._._._._._.v.a._.t._.i.l._.p.eu.eu._._.t._.on.on._.v.a._.t._.è.l.l._._._.v.a._.t._.on.on._.v.a._.t._.an.an'
    // prettier-ignore
    const expectedSyllablesValue = [[2, 2], [12, 13], [15, 18], [20, 23], [25, 28], [30, 31], [33, 36], [37, 39], [41, 42], [44, 47], [49, 50], [52, 55]]
    const expectedSilentLettersValue = [23, 38, 39]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toStrictEqual(expectedSilentLettersValue)
  })

  it('should return correct syllables for words with compact letters', () => {
    const text = 'sœur soeur'
    const lang = 'fr'
    const expectedPhonemes = 's.oeu|oeu.oeu.r._.s.oeu.oeu.oeu.r'
    // prettier-ignore
    const expectedSyllablesValue = [[0, 3], [5, 9]]

    const { phonemes, syllables, silentLetters } = textEngine.analyse(text, lang)

    expect(phonemes).toHaveLength(text.length)
    expect(mapFrPhonemes(phonemes)).toBe(expectedPhonemes)
    expect(syllables).toStrictEqual(expectedSyllablesValue)
    expect(silentLetters).toHaveLength(0)
  })

  it('should return laisons for case 1', () => {
    const text = 'sans - eee Les amis quand à moi ces onze ces amis les hôtels les, anges premier. enfant'
    const lang = 'fr'
    // prettier-ignore
    const expectedLiaisonsValue = [[3, 7, 'z'], [13, 15, 'z'], [43, 45, 'z'], [52, 54, 'z']]

    const { liaisons } = textEngine.analyse(text, lang)
    expect(liaisons).toStrictEqual(expectedLiaisonsValue)
  })
})
