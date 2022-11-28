<script setup lang="ts">
import { useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'

const { preferencesState } = useTextAdaptationPreferences()

const props = defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (event: 'input', profileId: string): void
}>()

const onChange = (event: Event) => emit('input', event.target.value)
</script>
<template>
  <select data-test-id="dropdown" :value="props.value" @change="onChange">
    <option value="">New Profile</option>
    <option v-for="({ name, id }, index) in preferencesState.profiles" :key="index" :value="id">
      {{ name }}
    </option>
  </select>
</template>
