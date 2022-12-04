import Vue from 'vue'
import App from './ui/App.vue'

import { withi18n } from './providers/withi18n'
import { withRouter } from './providers/withRouter'
import { withSanitize } from './providers/withSanitize'
import { withVueConfig } from './providers/withVueConfig'

import './styles/theme.scss'

export const mountApp = async () => {
  withVueConfig()
  withSanitize()
  const { i18n } = withi18n()
  const { router } = withRouter()

  new Vue({
    i18n,
    router,
    render: (h) => h(App)
  }).$mount('#app')
}
