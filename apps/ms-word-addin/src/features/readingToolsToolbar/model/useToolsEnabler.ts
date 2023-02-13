import { ref, watch } from 'vue'

export function useToolsEnabler() {
  const maskEnabled = ref(false)
  const rulerEnabled = ref(false)

  watch(maskEnabled, () => {
    if (maskEnabled.value) {
      rulerEnabled.value = false
    }
  })

  watch(rulerEnabled, () => {
    if (rulerEnabled.value) {
      maskEnabled.value = false
    }
  })

  return { maskEnabled, rulerEnabled }
}
