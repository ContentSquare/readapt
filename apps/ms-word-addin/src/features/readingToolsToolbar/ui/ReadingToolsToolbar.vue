<script setup lang="ts">
import { ref } from 'vue'
import ReadingToolsFormModal from './ReadingToolsFormModal.vue'
import ReadingToolsRuler from './ReadingToolsRuler.vue'
import ReadingToolsMask from './ReadingToolsMask.vue'
import { useToolsEnabler } from '../model/useToolsEnabler'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'

const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())

const { maskEnabled, rulerEnabled } = useToolsEnabler()
</script>
<template>
  <div class="sticky top-0 z-10 flex items-center gap-4 bg-white py-2 px-4 print:hidden">
    <slot name="before" />

    <label class="flex cursor-pointer items-center">
      <input v-model="maskEnabled" type="checkbox" class="toggle toggle-sm mr-1" />
      {{ $t('DIALOG_BOX.MASK') }}
    </label>

    <label class="flex cursor-pointer items-center">
      <input v-model="rulerEnabled" type="checkbox" class="toggle toggle-sm mr-1" />
      {{ $t('DIALOG_BOX.RULER') }}
    </label>

    <ReadingToolsFormModal
      v-model:mask-opacity="mask.opacity"
      v-model:mask-thickness="mask.thickness"
      v-model:ruler-opacity="ruler.opacity"
      v-model:ruler-thickness="ruler.thickness"
    />

    <slot name="after" />
  </div>
  <ReadingToolsMask v-if="maskEnabled" :mask="mask" />
  <ReadingToolsRuler v-if="rulerEnabled" :ruler="ruler" />
</template>
