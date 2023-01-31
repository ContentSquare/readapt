import { vi } from 'vitest'

vi.mock('vue-i18n', () => {
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
