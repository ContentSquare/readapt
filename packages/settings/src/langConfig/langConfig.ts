import { Language, LangConfig } from '../models'

import { langConfigFr } from './langConfigFr'
import { langConfigEn } from './langConfigEn'

export const getLangConfig = (language: Language): LangConfig => (language === 'en' ? langConfigEn : langConfigFr)
