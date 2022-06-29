<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { BTableSimple, BTbody, BTd, BTh, BTr } from 'bootstrap-vue'
import { opacityOptions, thicknessOptions } from '@readapt/settings'

import { buildDefaultSettingsReadingTool } from '@/constants/defaultSettingsReadingTool'
import { SettingsReadingTool } from '@/interfaces/settingsReadingTool'
import utils from '@/chrome'
import { RangeBar } from '@readapt/shared-components'

const QuickActivate = defineComponent({
  components: {
    BTableSimple,
    BTbody,
    BTr,
    BTh,
    BTd,
    RangeBar
  },
  setup() {
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

    return {
      opacityOptions,
      thicknessOptions,
      updateMaskSettings,
      updateRuleSettings,
      mask,
      ruler
    }
  }
})
export default QuickActivate
</script>
<template>
  <div class="border rounded">
    <div class="text-uppercase pl-1 my-3">{{ $t('QUICK_ACTIVATE.QUICK_ACTIVATE') }}</div>
    <b-table-simple striped small responsive style="max-height: 35vh">
      <b-tbody>
        <!-- FONT
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.FONT') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td>
            <b-form-select :options="fontFamilyOptions" :value="settings.fontFamily" />
          </b-td>
        </b-tr>-->
        <!-- FONT SIZE
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.FONT_SIZE') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td class="align-middle">
            <SelectPercentage :options="fontSizeOptions" :value="settings.fontSize" @change="updateOption('fontSize', $event)" />
          </b-td>
        </b-tr>
        -->
        <!--
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.SYLLABLE_SETTINGS') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td class="text-right">
            <b-form-checkbox switch />
          </b-td>
        </b-tr>
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.PHONEME_SETTINGS') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td class="text-right">
            <b-form-checkbox switch />
          </b-td>
        </b-tr>
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.LETTER_SETTINGS') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td class="text-right">
            <b-form-checkbox switch />
          </b-td>
        </b-tr>
        <b-tr>
          <b-th class="align-middle">{{ $t('QUICK_ACTIVATE.SHADE_ALTERNATE_LINES') }}</b-th>
          <b-th class="text-center align-middle">
            <b-icon-question-circle font-scale="1.7" />
          </b-th>
          <b-td class="text-right">
            <b-form-checkbox switch />
          </b-td>
        </b-tr>-->

        <b-tr>
          <b-th class="bg-white" rowspan="2">{{ $t('QUICK_ACTIVATE.SCREEN_MASK') }}</b-th>
          <b-td class="align-middle">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</b-td>
          <b-td>
            <RangeBar :value="mask.thickness" :options="thicknessOptions" @change="updateMaskSettings(mask, 'thickness', $event)"></RangeBar>
          </b-td>
        </b-tr>

        <b-tr>
          <b-td class="align-middle">{{ $t('QUICK_ACTIVATE.OPACITY') }}</b-td>
          <b-td>
            <RangeBar :value="mask.opacity" :options="opacityOptions" @change="updateMaskSettings(mask, 'opacity', $event)"></RangeBar>
          </b-td>
        </b-tr>

        <b-tr>
          <b-th class="bg-white" rowspan="2">{{ $t('QUICK_ACTIVATE.READING_RULER') }}</b-th>
          <b-td class="align-middle">{{ $t('QUICK_ACTIVATE.THICKNESS') }}</b-td>
          <RangeBar :value="ruler.thickness" :options="thicknessOptions" @change="updateRuleSettings(ruler, 'thickness', $event)"></RangeBar>
        </b-tr>
        <b-tr>
          <b-td class="align-middle">{{ $t('QUICK_ACTIVATE.OPACITY') }}</b-td>
          <b-td>
            <RangeBar :value="ruler.opacity" :options="opacityOptions" @change="updateRuleSettings(ruler, 'opacity', $event)"></RangeBar>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>
