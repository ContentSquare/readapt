<script setup lang="ts">
import { ref } from 'vue'
import ReadingToolsForm from './ReadingToolsForm.vue'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'

const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
</script>
<template>
  <ReadingToolsForm
    v-model:mask-opacity="mask.opacity"
    v-model:mask-thickness="mask.thickness"
    v-model:ruler-opacity="ruler.opacity"
    v-model:ruler-thickness="ruler.thickness"
  />
</template>
