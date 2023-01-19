import { vi } from 'vitest'

vi.mock('vue', async () => {
  // TODO: Determine the actual Vue type and get rid of any
  const Vue = await vi.importActual<any>('vue')

  Vue.default.config.productionTip = false
  Vue.default.config.devtools = false

  return Vue
})

vi.mock('vue-i18n-composable', () => {
  // TODO: try not to mock the i18n
  return {
    useI18n() {
      return {
        t(value: string) {
          return value
        }
      }
    }
  }
})
