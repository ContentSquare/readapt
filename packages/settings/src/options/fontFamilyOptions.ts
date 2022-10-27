import { Option } from '../models'

export type FontFamilyOption = 'inherit' | 'Arial' | 'OpenDyslexic' | 'Luciole'

export const fontFamilyOptions: Option<FontFamilyOption>[] = [
  { value: 'inherit', text: 'Default' },
  { value: 'Arial', text: 'Arial' },
  { value: 'OpenDyslexic', text: 'Open Dyslexic' },
  { value: 'Luciole', text: 'Luciole' }
]
