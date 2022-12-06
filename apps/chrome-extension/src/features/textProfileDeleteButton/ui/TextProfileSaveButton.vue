<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'

const props = defineProps<{
  value: TextProfileId | null
  settings: Settings
}>()
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onClick">
    <!-- {{ $t('SETTINGS.SAVE') }} -->
    Save
  </b-button>
</template>
