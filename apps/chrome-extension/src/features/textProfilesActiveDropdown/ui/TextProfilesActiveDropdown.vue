<script setup lang="ts">
import { TextProfileId, useTextPreferences } from '@/entities/textPreferences'

const { preferences } = useTextPreferences()

// const onChange = ({ target: { value } }: Event) => {
//   const emittedValue = value ? Number(value) : undefined
//   emit('input', emittedValue)
// }
</script>
<template>
  <select data-test-id="dropdown">
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
