<script setup lang="ts">
import { useTextAdaptationPreferences } from '../model/state/useTextAdaptationPreferences'

const { profiles } = useTextAdaptationPreferences()

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
    <option v-for="({ name, id }, index) in profiles" :key="index" :value="id">
      {{ name }}
    </option>
  </select>
</template>
