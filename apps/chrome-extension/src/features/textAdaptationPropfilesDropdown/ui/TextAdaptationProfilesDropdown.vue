<script setup lang="ts">
import { TextAdaptationProfileId, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'

const { preferencesState } = useTextAdaptationPreferences()

const props = defineProps<{
  value: TextAdaptationProfileId | undefined
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextAdaptationProfileId | undefined): void
}>()

const onChange = ({ target: { value } }: Event) => {
  const emittedValue = value ? Number(value) : undefined
  emit('input', emittedValue)
}
</script>
<template>
  <select data-test-id="dropdown" :value="props.value" @change="onChange">
    <option value="">New Profile</option>
    <option v-for="{ name, id } in preferencesState.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
