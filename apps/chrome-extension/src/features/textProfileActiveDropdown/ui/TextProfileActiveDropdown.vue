<script setup lang="ts">
import { useTextPreferences } from '@/entities/textPreferences'

const { preferences, setActiveProfileId } = useTextPreferences()

const onChange = ({ target: { value } }: Event) => {
  setActiveProfileId(parseInt(value))
}
</script>
<template>
  <select data-test-id="dropdown" :value="preferences.activeProfileId" @change="onChange">
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
