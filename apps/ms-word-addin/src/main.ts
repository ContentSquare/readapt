import CompositionApi from '@vue/composition-api'
import { ToastPlugin, SidebarPlugin } from 'bootstrap-vue'
import Vue from 'vue'

import App from './App.vue'
import i18n from './i18n'
import router from './router'
import store from './store'

import './theme.scss'

Vue.config.productionTip = false

Vue.use(CompositionApi)
Vue.use(ToastPlugin)
Vue.use(SidebarPlugin)

Office.onReady(() => {
  new Vue({
    i18n,
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app')
}).catch(console.error)

// async prefetch of text engine
const prefetchTextEngine = async () => {
  await import('@readapt/text-engine')
}
prefetchTextEngine().then(() => console.log('text engine loaded'))
