import Vue from 'vue'
import VueSanitize from 'vue-sanitize'
import Vuex from 'vuex'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import { store, getStateFromLocalStorage } from './store'

import './theme.scss'

Vue.config.productionTip = false

Vue.use(VueSanitize)
Vue.use(Vuex)

const mountApp = async () => {
  const initialState = await getStateFromLocalStorage()
  store.replaceState(initialState)

  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}

mountApp()
