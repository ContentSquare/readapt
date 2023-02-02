<script lang="ts" setup>
import { computed } from 'vue'
import AdaptContainer from '@/shared/ui/AdaptContainer.vue'
import type { TextSettingsTemplate } from '@/entities/textSettingsTemplate'
import { adaptHtmlElementAsyncFn } from '@/shared/lib/textAdaptation'
import { useI18n } from 'vue-i18n'
import type { TextSettings } from '@/entities/textPreferences'

type Props = {
  template: TextSettingsTemplate
}
const props = defineProps<Props>()

interface Emits {
  (event: 'modify', value: TextSettings): void
}
const emit = defineEmits<Emits>()
const emitModify = () => {
  emit('modify', props.template.settings)
}

const templateContent = computed(() => `<p>${props.template.content}</p>`)
const { t } = useI18n()
</script>

<template>
  <div class="rounded border p-4">
    <div class="flex justify-between">
      <div class="mb-2 font-semibold">{{ template.name }}</div>
      <button class="btn-primary btn-sm btn" @click="emitModify">{{ t('SELECT_TEMPLATE.MODIFY') }}</button>
    </div>

    <ul class="list-disc pl-4">
      <template v-for="description of template.descriptions" :key="description">
        <li>{{ description }}</li>
      </template>
    </ul>

    <AdaptContainer
      class="mt-2 w-3/4"
      :adapt-html-element-async="adaptHtmlElementAsyncFn()"
      :content-to-adapt="templateContent"
      :settings="template.settings"
      :scope="template.value"
    />
  </div>
</template>
