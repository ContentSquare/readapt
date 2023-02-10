<script setup lang="ts">
import { computed } from 'vue'
import { useMousePosition } from '../model/useMousePosition'
import type { SettingsReadingTool } from '@/entities/readingTools'

const props = defineProps<{
  mask: SettingsReadingTool
}>()

const backgroundColor = computed(() => {
  const MASK_BASE_COLOR = '#000000'
  return MASK_BASE_COLOR + props.mask.opacity
})

const height = computed(() => {
  const MASK_BASE_HEIGHT = 25
  return MASK_BASE_HEIGHT * parseInt(props.mask.thickness)
})
const heightPx = computed(() => `${height.value}px`)

const { clientY } = useMousePosition()
const translateY = computed(() => {
  const offset = clientY.value - Math.floor(height.value / 2)
  return `${offset}px`
})
</script>
<template>
  <div class="mask__top fixed inset-0"></div>
  <div class="mask__bottom top-50 fixed inset-0"></div>
</template>

<style scoped>
.mask__top,
.mask__bottom {
  background: v-bind(backgroundColor);
}

.mask__top {
  clip-path: inset(0 0 calc(100% - v-bind(translateY)) 0);
}

.mask__bottom {
  clip-path: inset(calc(v-bind(translateY) + v-bind(heightPx)) 0 0 0);
}
</style>
