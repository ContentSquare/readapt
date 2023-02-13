<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useOpenDialogBox } from '../model/useOpenDialogBox'
import { useGetDocumentBody } from '../model/useGetDocumentBody'
import type { TextSettings as Settings } from '@/entities/textPreferences'
import { toRefs } from 'vue'

type Props = {
  settings: Settings
}
const props = defineProps<Props>()
const { settings } = toRefs(props)

const { t } = useI18n()
const openDialogBox = useOpenDialogBox(settings)
const getDocumentBody = useGetDocumentBody()

const adaptDocument = async () => {
  const document = await getDocumentBody()
  openDialogBox(document)
}
</script>
<template>
  <button class="btn-accent btn" @click="adaptDocument">
    {{ t('MAIN_MENU.ADAPT_DOC') }}
  </button>
</template>
