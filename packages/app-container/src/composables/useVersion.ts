import { computed } from '@vue/composition-api'

export function useVersion() {
  const version = computed(() => {
    return 'v1.4.0'
  })
  return { version }
}
