<script setup lang="ts">
import { computed } from 'vue'
import { useMousePosition } from '../model/useMousePosition'
import type { SettingsReadingTool } from '@/entities/readingTools'

const props = defineProps<{
  ruler: SettingsReadingTool
}>()

const { clientY } = useMousePosition()
const translateY = computed(() => {
  if (clientY.value < 50) {
    return '50px'
  }
  return `${clientY.value}px`
})

const backgroundColor = computed(() => {
  const RULER_BASE_COLOR = '#000000'
  return RULER_BASE_COLOR + props.ruler.opacity
})
const height = computed(() => `${props.ruler.thickness}px`)

console.log(props)
</script>
<template>
  <div class="ruler fixed inset-x-0 top-0 bg-black"></div>
</template>

<style scoped>
.ruler {
  height: v-bind(height);
  transform: translateY(v-bind(translateY));
  background-color: v-bind(backgroundColor);
}
</style>
