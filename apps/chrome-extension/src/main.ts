import Vue from 'vue'
import VueSanitize from 'vue-sanitize'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import { initializeStore } from './store'

import './theme.scss'

Vue.config.productionTip = false
Vue.use(VueSanitize)

const mountApp = async () => {
  const store = await initializeStore()

  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}

mountApp()
