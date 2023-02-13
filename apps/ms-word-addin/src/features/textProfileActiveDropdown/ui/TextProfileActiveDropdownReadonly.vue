<script setup lang="ts">
import { useTextPreferences } from '@/entities/textPreferences'

const { preferences } = useTextPreferences()

defineProps<{ modelValue: number }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
}>()

const onValueChange = (event: Event): void => {
  const { value } = event.target as HTMLSelectElement
  emit('update:modelValue', Number(value))
}
</script>
<template>
  <select :value="modelValue" class="select-primary select select-sm" @change="onValueChange">
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
