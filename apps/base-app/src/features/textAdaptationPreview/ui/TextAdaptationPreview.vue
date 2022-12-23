<script lang="ts" setup>
import { computed } from 'vue'
import type { TextSettings } from '@/entities/textPreferences'
import { AdaptContainer, PreviewContainer } from '@readapt/shared-components'
import { useLangTextPreview } from '../model/useLangTextPreview'
import { adaptHtmlElementAsyncFn } from '../lib/visualEngine/adaptHtmlElementAsync'

const props = defineProps<{ settings: TextSettings }>()

const { text, updateText } = useLangTextPreview(computed(() => props.settings.language))
</script>
<template>
  <PreviewContainer :content-to-adapt="text" @update="updateText">
    <AdaptContainer :adapt-html-element-async="adaptHtmlElementAsyncFn()" :content-to-adapt="$sanitize('<p>' + text + '</p>')" :settings="settings" />
  </PreviewContainer>
</template>
