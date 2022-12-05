<script setup lang="ts">
import { TextProfileId, TextSettings, useTextPreferences } from '@/entities/textPreferences'

const { preferences } = useTextPreferences()

const props = defineProps<{
  value: TextProfileId | null
  settings: TextSettings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | undefined): void
}>()

const onChange = ({ target: { value } }: Event) => {
  const emittedValue = value ? Number(value) : null
  emit('input', emittedValue)
}
</script>
<template>
  <select data-test-id="dropdown" :value="props.value" @change="onChange">
    <option value="">New Profile</option>
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
