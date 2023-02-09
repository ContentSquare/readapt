import { createApp } from 'vue'
import App from './ui/App.vue'

import { withOffice } from './providers/withOffice'
import { withi18n } from './providers/withi18n'
import { withRouter } from './providers/withRouter'

import './styles/tailwind.scss'

export const mountUI = async () => {
  await withOffice()
  const { i18n } = await withi18n()
  const { router } = withRouter()

  const app = createApp(App)
  app.use(i18n)
  app.use(router)

  app.mount('#app')
}
