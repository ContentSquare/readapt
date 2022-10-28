import { Language } from './language'
import { ColoredItem } from './coloredItem'
import {
  ColorOption,
  FontFamilyOption,
  FontSizeOption,
  LetterSpacingOption,
  LineSpacingOption,
  OpacityOption,
  SilentLetterOpacityOption,
  WordSpacingOption
} from '../options'

export interface Settings {
  language: Language
  fontFamily: FontFamilyOption
  fontSize: FontSizeOption
  letterSpacing: LetterSpacingOption
  wordSpacing: WordSpacingOption
  lineSpacing: LineSpacingOption
  syllableColor1?: ColorOption
  syllableColor2?: ColorOption
  syllableActive: boolean
  syllableOpacity: OpacityOption
  silentLetterOpacity: SilentLetterOpacityOption
  silentLetterActive: boolean
  shadeAlternateLinesOpacity: OpacityOption
  shadeAlternateLinesActive: boolean
  liaisonsOpacity?: OpacityOption
  liaisonsActive?: boolean
  phonemesActive: boolean
  phonemes: ColoredItem[]
  lettersActive: boolean
  letters: ColoredItem[]
}
