<script setup lang="ts">
import { useTextPreferences } from '@/entities/textPreferences'
import BaseDropdown from '@/shared/ui/BaseDropdown.vue'

const { preferences, setActiveProfileId } = useTextPreferences()

const onChange = ({ target }: Event) => {
  const { value } = target as HTMLSelectElement
  setActiveProfileId(parseInt(value))
}
</script>
<template>
  <BaseDropdown :value="preferences.activeProfileId" @change="onChange">
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </BaseDropdown>
</template>
