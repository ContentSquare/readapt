import { computed } from 'vue'

export function useVersion() {
  const version = computed(() => {
    return process.env.VUE_APP_VERSION
  })
  return { version }
}
