<script setup lang="ts">
import { computed } from 'vue'
import { useMousePosition } from '../model/useMousePosition'
import type { SettingsReadingTool } from '@/entities/readingTools'

const props = defineProps<{
  mask: SettingsReadingTool
}>()

const { clientY } = useMousePosition()
const translateY = computed(() => {
  if (clientY.value < 50) {
    return '50px'
  }
  return `${clientY.value}px`
})

const backgroundColor = computed(() => {
  const MASK_VERLAY_BASE_COLOR = '#000000'
  return MASK_VERLAY_BASE_COLOR + props.mask.opacity
})
const height = computed(() => {
  const MASK_BASE_HEIGHT = 25
  const height = MASK_BASE_HEIGHT * parseInt(props.mask.thickness)
  return `${height}px`
})

console.log(props)
</script>
<template>
  <div class="ruler__overlay fixed inset-0"></div>
  <div class="ruler__line fixed inset-x-0 top-0 bg-white"></div>
</template>

<style scoped>
.ruler__line {
  height: v-bind(height);
  transform: translateY(v-bind(translateY));
}

.ruler__overlay {
  background-color: v-bind(backgroundColor);
}
</style>
