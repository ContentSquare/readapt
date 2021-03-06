import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'
import utils from '@/chrome'

Vue.use(VueI18n)

const messages = { en, fr }

const getLang = () => (navigator.languages?.length ? navigator.languages[0] : navigator.language)

const i18n = new VueI18n({
  locale: getLang()?.substring(0, 2),
  fallbackLocale: 'en',
  messages
})

const loadLocale = async () => {
  const locale = await utils.getLocale()

  if (locale) {
    i18n.locale = locale
  }
}

loadLocale().catch(console.error)

export default i18n
