/**
 * Represents a Phoneme or Letter to be colored
 */
export interface ColoredItem {
  key: string
  value: string
  color?: string
  bold: boolean
  active: boolean
}
