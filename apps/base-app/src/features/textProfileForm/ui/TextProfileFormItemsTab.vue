<script lang="ts" setup>
import { computed } from 'vue'
import { BFormCheckbox, BTable } from 'bootstrap-vue'

import type { ColoredItem, ColoredOption, ColorOption } from '@readapt/settings'
import { buildItemPreview } from '@readapt/visual-engine'
import { ColorPicker } from '@readapt/shared-components'

import { useI18n } from 'vue-i18n-composable'
import type { SettingsTableItem } from '@/interfaces'

interface Props {
  tableLabel: string
  switchAllLabel: string
  allItemsActive: boolean
  items: ColoredItem[]
  options: ColoredOption[]
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update-items', value: unknown)
  (event: 'update-active', value: boolean)
}
const emit = defineEmits<Emits>()

const updateOption = (value: unknown) => emit('update-items', value)
const switchAllItems = (event: Event): void => {
  const checked = (event.target as HTMLInputElement).checked
  emit('update-active', checked)
}

const { t } = useI18n()
const tableFields = computed(() => {
  return [
    { key: 'value', label: t(props.tableLabel) },
    { key: 'example', label: t('SETTINGS.EXAMPLE') },
    { key: 'color', label: t('SETTINGS.TEXT_COLOR') },
    { key: 'bold', label: t('SETTINGS.BOLD') },
    { key: 'activate', label: t('SETTINGS.ACTIVATE') }
  ]
})

const tableItems = computed<SettingsTableItem[]>(() => {
  return props.items.map((item) => {
    const example = buildItemPreview(props.options, item)
    return { ...item, example }
  })
})

const switchBold = (itemKey: string): void => {
  const items = props.items.slice()
  const index = items.findIndex(({ key }) => key === itemKey)
  if (index === -1) {
    return
  }
  const item = items[index]
  items[index] = { ...item, bold: !item.bold }
  updateOption(items)
}

const switchActive = (itemKey: string): void => {
  const items = props.items.slice()
  const index = items.findIndex(({ key }) => key === itemKey)
  if (index === -1) {
    return
  }
  const item = items[index]
  items[index] = { ...item, active: !item.active }
  updateOption(items)
}

const setColor = (itemKey: string, color: ColorOption): void => {
  const items = props.items.slice()
  const index = items.findIndex(({ key }) => key === itemKey)
  if (index === -1) {
    return
  }
  const item = items[index]
  items[index] = { ...item, color }
  updateOption(items)
}
</script>

<template>
  <div class="w-full">
    <label class="inline-block cursor-pointer py-4">
      <input type="checkbox" class="toggle mr-3 align-middle" :checked="allItemsActive" @input="switchAllItems" />
      {{ t(switchAllLabel) }}
    </label>
    <b-table small striped sticky-header="73vh" :items="tableItems" :fields="tableFields" responsive="sm">
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
