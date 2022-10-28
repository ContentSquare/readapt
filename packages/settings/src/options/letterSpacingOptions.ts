import { Option } from '../models'

export type LetterSpacingOption = 'inherit' | '2px' | '3.5px' | '5px'

export const letterSpacingOptions: Option<LetterSpacingOption>[] = [
  { value: 'inherit', text: 'DEFAULT' },
  { value: '2px', text: 'MEDIUM' },
  { value: '3.5px', text: 'LARGE' },
  { value: '5px', text: 'EXTRA_LARGE' }
]
