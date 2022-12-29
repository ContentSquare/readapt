<script lang="ts" setup>
import { computed } from 'vue'

type Variant = 'primary'
const VARIANTS: Record<Variant, string> = {
  primary: 'text-white bg-primary-base hover:bg-primary-darker-10 active:bg-primary-darker-30'
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
