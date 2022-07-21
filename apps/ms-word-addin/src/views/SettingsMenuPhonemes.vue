<script lang="ts">
import { computed, defineComponent, unref } from '@vue/composition-api'
import { BFormCheckbox, BTable } from 'bootstrap-vue'

import { ColoredItem, ColoredOption, SettingsKey } from '@readapt/settings'
import { buildItemPreview } from '@readapt/visual-engine'
import { ColorPicker } from '@readapt/shared-components'

import store from '@/store'
import i18n from '@/i18n'
import { SettingsTableItem } from '@/interfaces'

const SettingsMenuPhonemes = defineComponent({
  components: { BFormCheckbox, BTable, ColorPicker },
  setup() {
    const tableFields = [
      { key: 'value', label: i18n.t('SETTINGS.PHONEME_AND_EXAMPLE') },
      { key: 'color', label: i18n.t('SETTINGS.TEXT_COLOR') },
      { key: 'bold', label: i18n.t('SETTINGS.BOLD') },
      { key: 'activate', label: i18n.t('SETTINGS.ACTIVATE') }
    ]

    const allItemsActive = computed<boolean>(() => store.getters.getPhonemesActive)
    const itemSettings = computed<ColoredItem[]>(() => store.getters.getPhonemes)

    const tableItems = computed<SettingsTableItem[]>(() => {
      const options: ColoredOption[] = store.getters.getPhonemeOptions
      return itemSettings.value.map((item) => {
        const example = buildItemPreview(options, item)
        return { ...item, example }
      })
    })

    const updateOption = (key: SettingsKey, value: unknown) => store.commit('updateOption', { key, value })

    const switchBold = (itemKey: string): void => {
      const items = unref(itemSettings)
      const item = items.find(({ key }) => key === itemKey)
      if (!item) {
        return
      }

      item.bold = !item.bold
      updateOption('phonemes', items)
    }

    const switchActive = (itemKey: string): void => {
      const items = unref(itemSettings)
      const item = items.find(({ key }) => key === itemKey)
      if (!item) {
        return
      }

      item.active = !item.active
      updateOption('phonemes', items)
    }

    const setColor = (itemKey: string, color: string): void => {
      const items = unref(itemSettings)
      const item = items.find(({ key }) => key === itemKey)
      if (!item) {
        return
      }

      item.color = color
      updateOption('phonemes', items)
    }

    const switchAllItems = (value: boolean): void => {
      updateOption('phonemesActive', value)
    }

    return {
      tableFields,
      tableItems,
      allItemsActive,
      // methods
      switchBold,
      switchActive,
      setColor,
      switchAllItems
    }
  }
})
export default SettingsMenuPhonemes
</script>

<template>
  <div>
    <div class="d-flex pt-2 pb-2" style="max-height: 10%">
      <b-form-checkbox :checked="allItemsActive" @change="switchAllItems" switch />
      <div class="ml-2">{{ $t('SETTINGS.ALL_PHONEMES_SETTINGS') }}</div>
    </div>
    <b-table style="margin-bottom: 0" sticky-header="90%" striped :items="tableItems" :fields="tableFields" responsive>
      <template #head(value)="value">
        <div class="h7">{{ value.label }}</div>
      </template>
      <template #head(color)="color">
        <div class="text-center h7">{{ color.label }}</div>
      </template>
      <template #head(bold)="bold">
        <div class="text-center h7">{{ bold.label }}</div>
      </template>
      <template #head(activate)="activate">
        <div class="text-center h7">{{ activate.label }}</div>
      </template>
      <template #cell(value)="row">
        <div class="h7 mb-2">{{ row.item.value }}</div>
        <div class="d-flex flex-wrap h7" v-html="row.item.example" />
      </template>
      <template #cell(color)="row">
        <div class="d-flex justify-content-center p-2">
          <ColorPicker :value="row.item.color" @selectColor="setColor(row.item.key, $event)" />
        </div>
      </template>
      <template #cell(bold)="row">
        <div class="text-center">
          <b-form-checkbox :checked="row.item.bold" @change="switchBold(row.item.key)" />
        </div>
      </template>
      <template #cell(activate)="row">
        <div class="text-center">
          <b-form-checkbox :checked="row.item.active" @change="switchActive(row.item.key)" switch />
        </div>
      </template>
    </b-table>
  </div>
</template>

<style lang="scss" scoped>
.h7 {
  font-size: 15px;
}
</style>
