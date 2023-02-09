<script setup lang="ts">
import { ref } from 'vue'
import ReadingToolsForm from './ReadingToolsForm.vue'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'

const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
</script>
<template>
  <!-- <b-form-checkbox :checked="maskSettings.enabled" inline switch @change="toggleMask()">
    {{ $t('DIALOG_BOX.MASK') }}
  </b-form-checkbox>
  <b-form-checkbox :checked="rulerSettings.enabled" inline switch @change="toggleRuler()">
    {{ $t('DIALOG_BOX.RULER') }}
  </b-form-checkbox> -->
  <label for="reading-tools-form-modal" class="btn-outline btn-xs btn">Settings</label>
  <input id="reading-tools-form-modal" type="checkbox" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="reading-tools-form-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
      <ReadingToolsForm
        v-model:mask-opacity="mask.opacity"
        v-model:mask-thickness="mask.thickness"
        v-model:ruler-opacity="ruler.opacity"
        v-model:ruler-thickness="ruler.thickness"
        class="mt-6"
      />
    </div>
  </div>
</template>
