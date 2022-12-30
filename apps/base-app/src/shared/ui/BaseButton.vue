<script lang="ts" setup>
import { computed } from 'vue'

type Variant = 'primary' | 'secondary'
type VariantClassOptions = {
  base: string
  enabled: string
  disabled: string
}
const VARIANTS: Record<Variant, VariantClassOptions> = {
  primary: {
    base: 'text-white',
    enabled: 'bg-primary-base hover:bg-primary-darker-10 active:bg-primary-darker-30',
    disabled: 'bg-primary-lighter-20'
  },
  secondary: {
    base: 'border-1 bg-white',
    enabled:
      'border-primary-base text-primary-base hover:border-primary-darker-10 hover:text-primary-darker-10 active:border-primary-darker-20 active:text-primary-darker-10',
    disabled: 'border-primary-lighter-20 text-primary-lighter-20'
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
  const options = VARIANTS[props.variant]
  const activeClass = props.disabled ? options.disabled : options.enabled
  return `${options.base} ${activeClass}`
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
