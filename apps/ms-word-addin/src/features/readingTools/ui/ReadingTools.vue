<script setup lang="ts">
import { ref, watch } from 'vue'
import ReadingToolsForm from './ReadingToolsForm.vue'
import ReadingToolsRuler from './ReadingToolsRuler.vue'
import ReadingToolsMask from './ReadingToolsMask.vue'
import PrintButton from '@/shared/ui/PrintButton.vue'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'

const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())

const maskEnabled = ref(false)
const rulerEnabled = ref(false)

watch(maskEnabled, () => {
  if (maskEnabled.value) {
    rulerEnabled.value = false
  }
})

watch(rulerEnabled, () => {
  if (rulerEnabled.value) {
    maskEnabled.value = false
  }
})
</script>
<template>
  <div class="sticky top-0 z-10 flex items-center gap-4 bg-white py-2 px-4 print:hidden">
    <label class="flex cursor-pointer items-center">
      <input v-model="maskEnabled" type="checkbox" class="toggle toggle-sm mr-1" />
      {{ $t('DIALOG_BOX.MASK') }}
    </label>

    <label class="flex cursor-pointer items-center">
      <input v-model="rulerEnabled" type="checkbox" class="toggle toggle-sm mr-1" />
      {{ $t('DIALOG_BOX.RULER') }}
    </label>

    <label for="reading-tools-form-modal" class="btn-outline btn-xs btn">{{ $t('SETTINGS.MY_PREFERENCES') }}</label>
    <input id="reading-tools-form-modal" type="checkbox" class="modal-toggle" />
    <label for="reading-tools-form-modal" class="modal cursor-pointer">
      <label class="modal-box relative" for="">
        <label for="reading-tools-form-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
        <ReadingToolsForm
          v-model:mask-opacity="mask.opacity"
          v-model:mask-thickness="mask.thickness"
          v-model:ruler-opacity="ruler.opacity"
          v-model:ruler-thickness="ruler.thickness"
          class="mt-6"
        />
      </label>
    </label>

    <!-- TODO: review if print button belongs to this component -->
    <PrintButton class="ml-auto" />
  </div>
  <ReadingToolsMask v-if="maskEnabled" :mask="mask" />
  <ReadingToolsRuler v-if="rulerEnabled" :ruler="ruler" />
</template>
