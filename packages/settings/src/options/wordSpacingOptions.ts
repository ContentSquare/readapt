import { Option } from '../models'

export type WordSpacingOption = 'inherit' | '2px' | '3.5px' | '5px'

export const wordSpacingOptions: Option<WordSpacingOption>[] = [
  { value: 'inherit', text: 'DEFAULT' },
  { value: '2px', text: 'MEDIUM' },
  { value: '3.5px', text: 'LARGE' },
  { value: '5px', text: 'EXTRA_LARGE' }
]
