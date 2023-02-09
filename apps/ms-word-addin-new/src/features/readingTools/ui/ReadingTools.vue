<script setup lang="ts">
import { ref } from 'vue'
import ReadingToolsForm from './ReadingToolsForm.vue'
import ReadingToolsRuler from './ReadingToolsRuler.vue'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'

const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())

const maskEnabled = ref(false)
const rulerEnabled = ref(false)
</script>
<template>
  <label class="cursor-pointer">
    <input v-model="maskEnabled" type="checkbox" class="toggle toggle-sm align-middle" />
    {{ $t('DIALOG_BOX.MASK') }}
  </label>

  <label class="cursor-pointer">
    <input v-model="rulerEnabled" type="checkbox" class="toggle toggle-sm align-middle" />
    {{ $t('DIALOG_BOX.RULER') }}
  </label>
  <ReadingToolsRuler v-if="rulerEnabled" :ruler="ruler" />

  <label for="reading-tools-form-modal" class="btn-outline btn-xs btn">{{ $t('SETTINGS.MY_PREFERENCES') }}</label>
  <input id="reading-tools-form-modal" type="checkbox" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label for="reading-tools-form-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
      <ReadingToolsForm
        v-model:mask-opacity="mask.opacity"
        v-model:mask-thickness="mask.thickness"
        v-model:ruler-opacity="ruler.opacity"
        v-model:ruler-thickness="ruler.thickness"
        class="mt-8"
      />
    </div>
  </div>
</template>
