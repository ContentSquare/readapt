<script setup lang="ts">
import { opacityOptions, thicknessOptions } from '@readapt/settings'

import type { SettingsReadingTool } from '@/entities/readingTools'
import RangeBar from '@/shared/ui/RangeBar.vue'

defineProps<{
  maskThickness: SettingsReadingTool['thickness']
  maskOpacity: SettingsReadingTool['opacity']
  rulerThickness: SettingsReadingTool['thickness']
  rulerOpacity: SettingsReadingTool['opacity']
}>()

type Emits = {
  (event: `update:maskThickness` | 'update:rulerThickness', value: SettingsReadingTool['thickness']): void
  (event: 'update:maskOpacity' | 'update:rulerOpacity', value: SettingsReadingTool['opacity']): void
}

const emit = defineEmits<Emits>()
</script>
<template>
  <label for="reading-tools-form-modal" class="btn-outline btn-xs btn">{{ $t('SETTINGS.MY_PREFERENCES') }}</label>
  <input id="reading-tools-form-modal" type="checkbox" class="modal-toggle" />
  <label for="reading-tools-form-modal" class="modal cursor-pointer">
    <label class="modal-box relative" for="">
      <label for="reading-tools-form-modal" class="btn-sm btn-circle btn absolute right-2 top-2">✕</label>
      <div class="mt-6 rounded-lg border border-base-300">
        <table class="table w-full">
          <tbody>
            <tr>
              <td class="w-40 p-3 font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.SCREEN_MASK') }}</td>
              <td class="p-3">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
              <td class="p-3">
                <RangeBar :model-value="maskThickness" :options="thicknessOptions" @update:model-value="emit('update:maskThickness', $event)" />
              </td>
            </tr>

            <tr>
              <td class="p-3">{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
              <td class="p-3">
                <RangeBar :model-value="maskOpacity" :options="opacityOptions" @update:model-value="emit('update:maskOpacity', $event)" />
              </td>
            </tr>

            <tr>
              <td class="w-40 border-b-0 bg-transparent p-3 font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.READING_RULER') }}</td>
              <td class="p-3">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
              <td class="p-3">
                <RangeBar :model-value="rulerThickness" :options="thicknessOptions" @update:model-value="emit('update:rulerThickness', $event)" />
              </td>
            </tr>

            <tr>
              <td class="p-3">{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
              <td class="p-3">
                <RangeBar :model-value="rulerOpacity" :options="opacityOptions" @update:model-value="emit('update:rulerOpacity', $event)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </label>
  </label>
</template>
