<script setup lang="ts">
import { TextProfileId, useTextPreferences } from '@/entities/textPreferences'

const { preferences } = useTextPreferences()
</script>
<template>
  <select data-test-id="dropdown" :value="preferences.activeProfileId">
    <option value="">Disable (no active profile)</option>
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
