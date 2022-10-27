import { Option } from '../models'

export type LineSpacingOption = 'inherit' | '2.1' | '2.55' | '3'

export const lineSpacingOptions: Option<LineSpacingOption>[] = [
  { value: 'inherit', text: 'DEFAULT' },
  { value: '2.1', text: 'MEDIUM' },
  { value: '2.55', text: 'LARGE' },
  { value: '3', text: 'EXTRA_LARGE' }
]
