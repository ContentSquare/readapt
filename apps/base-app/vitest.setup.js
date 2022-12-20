import { vi } from 'vitest'

vi.mock('vue', async () => {
  const Vue = await vi.importActual('vue')

  Vue.default.config.productionTip = false
  Vue.default.config.devtools = false

  return Vue
})
