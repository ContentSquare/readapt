import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'

import './theme.scss'

Vue.config.productionTip = false

Vue.use(CompositionApi)

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
