<script lang="ts" setup>
import { computed } from 'vue'
import type { TextSettings } from '@/entities/textPreferences'
import AdaptContainer from '@/shared/ui/AdaptContainer.vue'
import PreviewContainer from '@/shared/ui/PreviewContainer.vue'
import { useLangTextPreview } from '../model/useLangTextPreview'
import { adaptHtmlElementAsyncFn } from '@/shared/lib/textAdaptation'
import sanitizeHtml from 'sanitize-html'

const props = defineProps<{ settings: TextSettings }>()

const { text, updateText } = useLangTextPreview(computed(() => props.settings.language))

const contentToAdapt = computed(() => sanitizeHtml(`<p>${text.value}</p>`))
</script>
<template>
  <PreviewContainer :content-to-adapt="text" @update="updateText">
    <AdaptContainer :adapt-html-element-async="adaptHtmlElementAsyncFn()" :content-to-adapt="contentToAdapt" :settings="settings" />
  </PreviewContainer>
</template>
