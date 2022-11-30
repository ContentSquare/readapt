import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import { store } from './store'

import { persistTextPreferencesState } from '@/entities/textPreferences'
import { LocalStorage } from '@/shared/storage'

import './theme.scss'

Vue.config.productionTip = false

Vue.use(VueSanitize)

const mountApp = async () => {
  await persistTextPreferencesState(chrome.extension ? chrome.storage.local : new LocalStorage())

  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}

mountApp()
