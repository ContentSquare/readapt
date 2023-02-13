<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useOpenDialogBox } from '../model/useOpenDialogBox'
import type { TextSettings as Settings } from '@/entities/textPreferences'
import { toRefs } from 'vue'
import { useGetDocumentSelection } from '../model/useGetDocumentSelection'

type Props = {
  settings: Settings
}
const props = defineProps<Props>()
const { settings } = toRefs(props)

const { t } = useI18n()
const openDialogBox = useOpenDialogBox(settings)
const getDocumentSelection = useGetDocumentSelection()

const adaptSelection = async () => {
  try {
    const selection = await getDocumentSelection()
    openDialogBox(selection, true)
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <button class="btn-accent btn" @click="adaptSelection">
    {{ t('MAIN_MENU.ADAPT_SELECTION') }}
  </button>
</template>
