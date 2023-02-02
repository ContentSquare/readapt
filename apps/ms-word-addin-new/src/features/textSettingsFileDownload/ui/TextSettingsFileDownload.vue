<script lang="ts" setup>
import { computed } from 'vue'
import type { TextSettings } from '@/entities/textPreferences'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ settings: TextSettings }>()

// TODO: implement lazy generation of the JSON
const settingsFile = computed(() => {
  const settingsFile = encodeURIComponent(JSON.stringify(props.settings, null, 2))
  return `data:application/json;charset=utf-8,${settingsFile}`
})
const { t } = useI18n()
</script>
<template>
  <a class="btn-secondary btn-ghost btn-sm btn" :href="settingsFile" data-test-id="anchor" download="settings.json" target="_blank">{{
    t('SETTINGS.DOWNLOAD_SETTINGS')
  }}</a>
</template>
