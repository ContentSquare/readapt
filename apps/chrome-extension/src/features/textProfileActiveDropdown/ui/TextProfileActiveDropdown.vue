<script setup lang="ts">
import { useTextPreferences } from '@/entities/textPreferences'

const { preferences, setActiveProfileId } = useTextPreferences()

const onChange = ({ target }: Event) => {
  const { value } = target as HTMLSelectElement
  setActiveProfileId(parseInt(value))
}
</script>
<template>
  <select class="select-primary select select-sm" :value="preferences.activeProfileId" @change="onChange">
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
