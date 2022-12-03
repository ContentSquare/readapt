<script lang="ts" setup>
import { computed } from 'vue'
import { TextSettings } from '@/entities/textPreferences'

const props = defineProps<{ settings: TextSettings }>()

// TODO: implement lazy generation of the JSON
const settingsFile = computed(() => {
  const settingsFile = encodeURIComponent(JSON.stringify(props.settings, null, 2))
  return `data:application/json;charset=utf-8,${settingsFile}`
})
</script>
<template>
  <a :href="settingsFile" data-test-id="anchor" download="settings.json" target="_blank">{{ $t('SETTINGS.DOWNLOAD_SETTINGS') }}</a>
</template>
