import { Option } from '../models'

export type OpacityOption = '33' | '66' | '99' | 'CC' | 'FF'

export const opacityOptions: Option<OpacityOption>[] = [
  { value: '33', text: '1' },
  { value: '66', text: '2' },
  { value: '99', text: '3' },
  { value: 'CC', text: '4' },
  { value: 'FF', text: '5' }
]
