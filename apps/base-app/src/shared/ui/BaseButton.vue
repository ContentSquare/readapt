<script lang="ts" setup>
import { computed } from 'vue'

type Variant = 'primary' | 'secondary'
const VARIANTS: Record<Variant, { enabled: string; disabled: string }> = {
  primary: {
    enabled: 'text-white bg-primary-base hover:bg-primary-darker-10 active:bg-primary-darker-30',
    disabled: 'text-white bg-primary-lighter-20'
  },
  secondary: {
    enabled:
      'border-1 border-primary-base bg-white text-primary-base hover:border-primary-darker-10 hover:text-primary-darker-10 active:border-primary-darker-20 active:text-primary-darker-10',
    disabled: 'border-1 border-primary-lighter-20 bg-white text-primary-lighter-20'
  }
}

interface Props {
  variant?: Variant
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})

const variantClass = computed(() => {
  const variantOptions = VARIANTS[props.variant]
  return props.disabled ? variantOptions.disabled : variantOptions.enabled
})
</script>
<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="rounded-4 px-1.5 py-1 text-button"
    :class="variantClass"
    :disabled="props.disabled"
    data-test-id="button"
  >
    <slot />
  </button>
</template>
