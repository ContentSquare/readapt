<script lang="ts" setup>
type Props = {
  modelValue: string
  options: { value: string; text: string }[]
}
defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()
const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
<template>
  <select class="select" :value="modelValue" @change="onChange">
    <option v-for="{ value, text } in options" :key="value" :value="value">{{ text }}</option>
  </select>
</template>
