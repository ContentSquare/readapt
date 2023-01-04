<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { opacityOptions, thicknessOptions } from '@readapt/settings'

import { buildDefaultSettingsReadingTool } from '@/constants/defaultSettingsReadingTool'
import type { SettingsReadingTool } from '@/interfaces/settingsReadingTool'
import utils from '@/chrome'
import RangeBar from '@/shared/ui/RangeBar.vue'

const { getMaskSettings, getRuleSettings, saveMaskSettings, saveRuleSettings, broadcastMessage } = utils
const mask = ref(buildDefaultSettingsReadingTool())
const ruler = ref(buildDefaultSettingsReadingTool())

watchEffect(async () => (mask.value = await getMaskSettings()))
watchEffect(async () => (ruler.value = await getRuleSettings()))

const updateMaskSettings = async (settings: SettingsReadingTool, prop: keyof SettingsReadingTool, value: string) => {
  settings[prop] = value
  await saveMaskSettings(settings)
  await broadcastMessage('UPDATE_MASK')
}

const updateRuleSettings = async (settings: SettingsReadingTool, prop: keyof SettingsReadingTool, value: string) => {
  settings[prop] = value
  await saveRuleSettings(settings)
  await broadcastMessage('UPDATE_RULER')
}
</script>
<template>
  <div>
    <div class="text-lg font-semibold">{{ $t('QUICK_ACTIVATE.QUICK_ACTIVATE') }}</div>
    <div class="mt-2 rounded-lg border border-base-300">
      <table class="table w-full">
        <tbody>
          <tr>
            <td class="w-40 font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.SCREEN_MASK') }}</td>
            <td>{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
            <td>
              <RangeBar :value="mask.thickness" :options="thicknessOptions" @change="updateMaskSettings(mask, 'thickness', $event)"></RangeBar>
            </td>
          </tr>

          <tr>
            <td>{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
            <td>
              <RangeBar :value="mask.opacity" :options="opacityOptions" @change="updateMaskSettings(mask, 'opacity', $event)"></RangeBar>
            </td>
          </tr>

          <tr>
            <td class="w-40 border-b-0 bg-transparent font-semibold" rowspan="2">{{ $t('QUICK_ACTIVATE.READING_RULER') }}</td>
            <td>{{ $t('QUICK_ACTIVATE.THICKNESS') }}</td>
            <td>
              <RangeBar :value="ruler.thickness" :options="thicknessOptions" @change="updateRuleSettings(ruler, 'thickness', $event)"></RangeBar>
            </td>
          </tr>

          <tr>
            <td>{{ $t('QUICK_ACTIVATE.OPACITY') }}</td>
            <td>
              <RangeBar :value="ruler.opacity" :options="opacityOptions" @change="updateRuleSettings(ruler, 'opacity', $event)"></RangeBar>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
