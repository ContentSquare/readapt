import { computed } from 'vue'

export function useVersion() {
  const version = computed(() => {
    return 'v1.4.4'
  })
  return { version }
}
