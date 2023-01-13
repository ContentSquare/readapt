<script lang="ts" setup>
import { type TextSettingsTemplate } from '@/entities/textSettingsTemplate'
import type { TextSettings, TextProfileId } from '@/entities/textPreferences'
import TextSettingsTemplatePreview from './TextSettingsTemplatePreview.vue'
import { useCreateTextProfileFromTemplate } from '../model/useCreateProfileFromTemplate'

interface Props {
  templates: TextSettingsTemplate[]
}
defineProps<Props>()

interface Emits {
  (event: 'created', value: TextProfileId)
}
const emit = defineEmits<Emits>()

const create = useCreateTextProfileFromTemplate()
const onModify = (settings: TextSettings) => {
  const newTextProfileId = create(settings)
  emit('created', newTextProfileId)
}
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <div v-for="template in templates" :key="template.value">
      <TextSettingsTemplatePreview @modify="onModify" class="h-full" :template="template" data-test-id="preview" />
    </div>
  </div>
</template>
