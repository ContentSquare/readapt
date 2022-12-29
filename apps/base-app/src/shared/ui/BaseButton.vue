<script lang="ts" setup>
import { computed } from 'vue'

type Variant = 'primary' | 'secondary'
const VARIANTS: Record<Variant, string> = {
  primary: 'text-white bg-primary-base hover:bg-primary-darker-10 active:bg-primary-darker-30',
  secondary:
    'border-1 border-primary-base bg-white text-primary-base hover:border-primary-darker-10 hover:text-primary-darker-10 active:border-primary-darker-20 active:text-primary-darker-10'
}

interface Props {
  variant?: Variant
}
const props = withDefaults(defineProps<Props>(), { variant: 'primary' })

const variantClasses = computed(() => VARIANTS[props.variant])
</script>
<template>
  <button v-bind="$attrs" v-on="$listeners" class="rounded-4 px-1.5 py-1 text-button" :class="variantClasses" data-test-id="button">
    <slot />
  </button>
</template>
