<script lang="ts" setup>
import { computed } from 'vue'

import type { ColoredItem, ColoredOption, ColorOption } from '@readapt/settings'
import { buildItemPreview } from '@readapt/visual-engine'
import ColorPicker from '@/shared/ui/ColorPicker.vue'

import { useI18n } from 'vue-i18n'
import type { SettingsTableItem } from '../model/settingsTableItem'

type Props = {
  tableLabel: string
  switchAllLabel: string
  allItemsActive: boolean
  items: ColoredItem[]
  options: ColoredOption[]
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update-items', value: unknown): void
  (event: 'update-active', value: boolean): void
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
    // { key: 'example', label: t('SETTINGS.EXAMPLE') },
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

const setColor = (itemKey: string, color: ColorOption | undefined): void => {
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
  <label class="inline-block cursor-pointer py-4">
    <input type="checkbox" class="toggle mr-3 align-middle" :checked="allItemsActive" @input="switchAllItems" />
    {{ t(switchAllLabel) }}
  </label>
  <div class="overflow-scroll">
    <table class="table-zebra table-compact table w-full">
      <thead>
        <tr>
          <th v-for="{ key, label } in tableFields" :key="key" class="sticky top-0 whitespace-normal">
            {{ label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tableItem in tableItems" :key="tableItem.key">
          <td v-for="{ key } in tableFields" :key="key" class="whitespace-normal">
            <template v-if="key === 'value'">
              <div>{{ tableItem.value }}</div>
              <div v-html="tableItem.example" />
            </template>
            <template v-else-if="key === 'color'">
              <ColorPicker :model-value="tableItem.color" @select-color="setColor(tableItem.key, $event)" />
            </template>
            <template v-else-if="key === 'bold'">
              <input type="checkbox" class="checkbox checkbox-sm" :checked="tableItem.bold" @change="switchBold(tableItem.key)" />
            </template>
            <template v-else-if="key === 'activate'">
              <input type="checkbox" class="toggle toggle-sm" :checked="tableItem.active" @change="switchActive(tableItem.key)" />
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
