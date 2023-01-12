<script lang="ts" setup>
interface Props {
  value: string
  options: { value: string; text: string }[]
}
defineProps<Props>()

interface Emits {
  (event: 'input', value: 'string')
}
const emit = defineEmits<Emits>()
const onChange = (event: Event) => {
  emit('input', event.target.value)
}
</script>
<template>
  <select class="select" :value="value" @change="onChange">
    <option :key="value" :value="value" v-for="{ value, text } in options">{{ text }}</option>
  </select>
</template>
