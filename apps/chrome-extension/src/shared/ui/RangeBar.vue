<script lang="ts" setup>
import { computed } from 'vue'
import type { Option } from '@readapt/settings'

interface Props {
  options: Option<string>[]
  value: string
  steps?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  steps: true
})

interface Emits {
  (event: 'input', value: string)
}
const emit = defineEmits<Emits>()

const min = '1'
const max = computed(() => props.options.length.toString())

const rangeValue = computed(() => {
  const { options, value } = props
  const index = options.findIndex((option) => option.value === value)
  const currentIndex = index === -1 ? 0 : index
  return String(currentIndex + 1)
})

const onValueChange = ({ target: { value } }: Event): void => {
  const option = props.options[parseInt(value) - 1]
  emit('input', option.value)
}
</script>

<template>
  <div>
    <input class="range range-secondary range-xs" type="range" :min="min" :max="max" step="1" :value="rangeValue" @input="onValueChange" />
    <div v-if="props.steps" class="flex w-full justify-between px-2 text-xs">
      <span data-test-id="step" v-for="item in options" :key="item.value">|</span>
    </div>
  </div>
</template>
