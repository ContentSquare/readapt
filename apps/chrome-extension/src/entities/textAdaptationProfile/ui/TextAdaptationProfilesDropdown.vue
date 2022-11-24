<script setup lang="ts">
const props = defineProps<{
  profiles: { id: string; name: string }[]
  value: string
}>()

const emit = defineEmits<{
  (event: 'input', profileId: string): void
}>()

const onChange = (event: Event) => emit('input', event.target.value)
</script>
<template>
  <select data-test-id="dropdown" :value="value" @change="onChange">
    <option value="">New Profile</option>
    <option v-for="({ name, id }, index) in props.profiles" :key="index" :value="id">
      {{ name }}
    </option>
  </select>
</template>
