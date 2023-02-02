<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { opacityOptions, thicknessOptions } from '@readapt/settings'

import { type SettingsReadingTool, buildDefaultSettingsReadingTool } from '@/entities/readingTools'
import RangeBar from '@/shared/ui/RangeBar.vue'
import { useExtensionUtils } from '@/shared/lib/extension'

const { getMaskSettings, getRuleSettings, saveMaskSettings, saveRuleSettings, broadcastMessage } = useExtensionUtils()
const mask = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())
const ruler = ref<SettingsReadingTool>(buildDefaultSettingsReadingTool())

onMounted(async () => {
  mask.value = await getMaskSettings()
  ruler.value = await getRuleSettings()
})

watch(
  mask,
  async () => {
    await saveMaskSettings(mask.value)
    await broadcastMessage('UPDATE_MASK')
  },
  { deep: true }
)
watch(
  ruler,
  async () => {
    await saveRuleSettings(ruler.value)
    await broadcastMessage('UPDATE_RULER')
  },
  { deep: true }
)
</script>
<template>
  <div>
    <div class="text-lg font-semibold">{{ $t('QUICK_ACTIVATE.QUICK_ACTIVATE') }}</div>
    <div class="mt-2 rounded-lg border border-base-300">
      <table class="table w-full">
        <tbody>
          <tr>
            <td class="w-40 p-3 font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.SCREEN_MASK') }}</td>
            <td class="p-3">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
            <td class="p-3"><RangeBar v-model="mask.thickness" :options="thicknessOptions" /></td>
          </tr>

          <tr>
            <td class="p-3">{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
            <td class="p-3"><RangeBar v-model="mask.opacity" :options="opacityOptions" /></td>
          </tr>

          <tr>
            <td class="w-40 border-b-0 bg-transparent p-3 font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.READING_RULER') }}</td>
            <td class="p-3">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
            <td class="p-3"><RangeBar v-model="ruler.thickness" :options="thicknessOptions" /></td>
          </tr>

          <tr>
            <td class="p-3">{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
            <td class="p-3"><RangeBar v-model="ruler.opacity" :options="opacityOptions" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
