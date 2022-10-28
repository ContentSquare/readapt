/**
 * Represents a Phoneme or Letter to be colored
 */
import { ColorOption } from '../options/colors'

export interface ColoredItem {
  key: string
  value: string
  color?: ColorOption
  bold: boolean
  active: boolean
}
