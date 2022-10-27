import { Option } from '../models'

export type ThicknessOption = '1' | '2' | '3'

export const thicknessOptions: Option<ThicknessOption>[] = [
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' }
]
