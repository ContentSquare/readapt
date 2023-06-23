<script lang="ts" setup>
import { computed } from 'vue'
import type { Option } from '@readapt/settings'

type Props = {
  options: Option<string>[]
  modelValue: string | undefined
  steps?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  steps: true
})

interface Emits {
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()

const min = '1'
const max = computed(() => props.options.length.toString())

const rangeValue = computed(() => {
  const index = props.options.findIndex((option) => option.value === props.modelValue)
  const currentIndex = index === -1 ? 0 : index
  return String(currentIndex + 1)
})

const onValueChange = (event: Event): void => {
  const { value } = event.target as HTMLInputElement
  const option = props.options[parseInt(value) - 1]
  emit('update:modelValue', option.value)
}
</script>

<template>
  <div>
    <input class="range range-secondary range-xs" type="range" :min="min" :max="max" step="1" :value="rangeValue" @input="onValueChange" />
    <div v-if="props.steps" class="flex w-full justify-between px-2 text-xs">
      <span v-for="item in options" :key="item.value" data-test-id="step">|</span>
    </div>
  </div>
</template>
