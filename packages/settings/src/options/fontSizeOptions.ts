import { Option } from '../models'

export type FontSizeOption = 'inherit' | '140%' | '170%' | '200%'

export const fontSizeOptions: Option<FontSizeOption>[] = [
  { value: 'inherit', text: 'DEFAULT' },
  { value: '140%', text: 'MEDIUM' },
  { value: '170%', text: 'LARGE' },
  { value: '200%', text: 'EXTRA_LARGE' }
]
