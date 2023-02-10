<script lang="ts" setup>
/* global Office */
import { computed, onMounted, ref } from 'vue'

import type { Settings } from '@readapt/settings'
import { useTextPreferences } from '@/entities/textPreferences'

import { adaptHtmlElementAsyncFn } from '@/shared/lib/textAdaptation'
import AdaptContainer from '@/shared/ui/AdaptContainer.vue'
import { ReadingTools } from '@/features/readingTools'
import FloatingImagesAlert from './FloatingImagesAlert.vue'

const error = ref<string>('')

const { getActiveProfile } = useTextPreferences()
const settings = computed(() => getActiveProfile()?.settings as Settings)

const docHtml = ref<string>('')

const hasFloatingImages = ref<boolean>(false)

const onMessage = (event: Office.DialogParentMessageReceivedEventArgs) => {
  try {
    const message = event.message
    const { html, withFloatingImages } = JSON.parse(message)
    docHtml.value = html
    hasFloatingImages.value = withFloatingImages
    console.log('withFloatingImages', withFloatingImages)
  } catch (e) {
    error.value = 'error'
  }
}

const sendReady = (): void => {
  Office.context.ui.messageParent('ready', { targetOrigin: '*' })
}

const onRegister = (asyncResult: Office.AsyncResult<unknown>): void => {
  sendReady()
  if (asyncResult.status !== Office.AsyncResultStatus.Succeeded) {
    error.value = asyncResult.error.message
  }
}

onMounted(() => {
  Office.onReady(() => {
    Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, onMessage, onRegister)
  })
})
</script>

<template>
  <ReadingTools />
  <div class="py-2 px-4">
    <div v-if="error">{{ error }}</div>
    <FloatingImagesAlert v-if="hasFloatingImages" />
    <AdaptContainer :adapt-html-element-async="adaptHtmlElementAsyncFn()" :settings="settings" :content-to-adapt="docHtml" />
  </div>
</template>
