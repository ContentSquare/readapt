import { createI18n } from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'

import { useExtensionUtils } from '@/shared/lib/extension'

export const withi18n = () => {
  const messages = { en, fr }

  const getLang = () => (navigator.languages?.length ? navigator.languages[0] : navigator.language)

  const i18n = createI18n({
    locale: getLang()?.substring(0, 2),
    fallbackLocale: 'en',
    messages,
    legacy: false
  })

  const loadLocale = async () => {
    const locale = await useExtensionUtils().getLocale()

    if (locale) {
      i18n.locale = locale
    }
  }

  loadLocale().catch(console.error)

  return { i18n }
}
