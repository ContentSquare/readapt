<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { BFormCheckbox, BTable } from 'bootstrap-vue'

import { ColoredItem, ColoredOption, Settings } from '@readapt/settings'
import { buildItemPreview } from '@readapt/visual-engine'
import { ColorPicker } from '@readapt/shared-components'

import store from '@/store'
import i18n from '@/i18n'
import { SettingsTableItem } from '@/interfaces'

const SettingsMenuLetters = defineComponent({
  components: {
    BFormCheckbox,
    BTable,
    ColorPicker
  },
  setup() {
    const tableFields = [
      { key: 'value', label: i18n.t('SETTINGS.LETTER') },
      { key: 'example', label: i18n.t('SETTINGS.EXAMPLE') },
      { key: 'color', label: i18n.t('SETTINGS.TEXT_COLOR') },
      { key: 'bold', label: i18n.t('SETTINGS.BOLD') },
      { key: 'activate', label: i18n.t('SETTINGS.ACTIVATE') }
    ]

    const allItemsActive = computed<Settings>(() => store.getters.getSettings.lettersActive)
    const itemSettings = computed<ColoredItem[]>(() => store.getters.getLetters)

    const tableItems = computed<SettingsTableItem[]>(() => {
      const options: ColoredOption[] = store.getters.getLetterOptions
      return itemSettings.value.map((item) => {
        const example = buildItemPreview(options, item)
        return { ...item, example }
      })
    })

    const switchBold = (itemKey: string): void => {
      const { value } = itemSettings
      const item = value.find(({ key }) => key === itemKey)

      if (item) {
        item.bold = !item.bold
      }

      store.dispatch('updateOption', { key: 'letters', value })
    }

    const switchActive = (itemKey: string): void => {
      const { value } = itemSettings
      const item = value.find(({ key }) => key === itemKey)

      if (item) {
        item.active = !item.active
      }

      store.dispatch('updateOption', { key: 'letters', value })
    }

    const setColor = (itemKey: string, color: string): void => {
      const { value } = itemSettings
      const item = value.find(({ key }) => key === itemKey)

      if (item) {
        item.color = color
      }

      store.dispatch('updateOption', { key: 'letters', value })
    }

    const switchAllItems = (value: boolean): void => {
      store.dispatch('updateOption', { key: 'lettersActive', value })
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
export default SettingsMenuLetters
</script>

<template>
  <div>
    <div class="d-flex pt-2 pb-2">
      <b-form-checkbox :checked="allItemsActive" @change="switchAllItems" switch />
      <div class="ml-2">{{ $t('SETTINGS.ALL_LETTERS_SETTINGS') }}</div>
    </div>
    <b-table striped sticky-header="50vh" :items="tableItems" :fields="tableFields">
      <template #head(color)="color">
        <div class="text-center">{{ color.label }}</div>
      </template>
      <template #head(bold)="bold">
        <div class="text-center">{{ bold.label }}</div>
      </template>
      <template #head(activate)="activate">
        <div class="text-center">{{ activate.label }}</div>
      </template>
      <template #cell(example)="row">
        <div class="d-flex" v-html="row.item.example" />
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

<style lang="scss" scoped></style>
