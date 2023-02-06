import { createI18n } from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'

import { useExtensionUtils } from '@/shared/lib/extension'

export const withi18n = async () => {
  const messages = { en, fr }

  const i18n = createI18n({
    locale: await getLocale(),
    fallbackLocale: 'en',
    messages,
    legacy: false
  })

  return { i18n }
}

async function getLocale() {
  const storedLocale = await useExtensionUtils().getLocale()
  if (storedLocale) {
    return storedLocale
  }

  const navigatorLanguage = navigator.languages?.length ? navigator.languages[0] : navigator.language
  if (navigatorLanguage) {
    return navigatorLanguage.substring(0, 2)
  }

  return 'en'
}
