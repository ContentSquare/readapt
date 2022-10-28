import { Option } from '../models'

export type SilentLetterOpacityOption = '0.2' | '0.4' | '0.5' | '0.6' | '0.8'

export const silentLetterOpacityOptions: Option<SilentLetterOpacityOption>[] = [
  { value: '0.2', text: '1' },
  { value: '0.4', text: '2' },
  { value: '0.5', text: '3' },
  { value: '0.6', text: '4' },
  { value: '0.8', text: '5' }
]
