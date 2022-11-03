import Vue from 'vue'
import VueSanitize from 'vue-sanitize'
import { VBTooltip } from 'bootstrap-vue'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'

import './theme.scss'

Vue.config.productionTip = false

Vue.use(VueSanitize)
Vue.directive('b-tooltip', VBTooltip)

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
