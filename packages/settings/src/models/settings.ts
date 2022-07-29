import { Language } from './language'
import { ColoredItem } from './coloredItem'

export interface Settings {
  language: Language
  fontFamily: string
  fontSize: string
  letterSpacing: string
  wordSpacing: string
  lineSpacing: string
  syllableColor1?: string
  syllableColor2?: string
  syllableActive: boolean
  syllableOpacity: string
  silentLetterOpacity: string
  silentLetterActive: boolean
  shadeAlternateLinesOpacity: string
  shadeAlternateLinesActive: boolean
  liaisonsOpacity?: string
  liaisonsActive?: boolean
  phonemesActive: boolean
  phonemes: ColoredItem[]
  lettersActive: boolean
  letters: ColoredItem[]
}
