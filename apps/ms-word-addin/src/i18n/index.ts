import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en.json'
import fr from './fr.json'

Vue.use(VueI18n)

const messages = { en, fr }

const getLang = () => (navigator.languages?.length ? navigator.languages[0] : navigator.language)

export default new VueI18n({
  locale: getLang()?.substring(0, 2),
  fallbackLocale: 'en',
  messages
})
