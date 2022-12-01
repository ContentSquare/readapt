<script lang="ts" setup>
import { computed } from 'vue'
import TextProfileActiveEditDropdown from './TextProfileActiveEditDropdown.vue'
import { useTextPreferences } from '@/entities/textPreferences'

const { preferences } = useTextPreferences()
const hasTextProfiles = computed(() => preferences.profiles.length > 0)
</script>

<template>
  <TextProfileActiveEditDropdown v-if="hasTextProfiles" data-test-id="dropdown" />
</template>
