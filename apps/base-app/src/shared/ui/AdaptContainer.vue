<script lang="ts" setup>
// TODO: add unit tests
import { ref, onUnmounted, watch } from 'vue'
import { type AdaptHtmlElementFn, removeStyleElement } from '@readapt/visual-engine'
import type { Settings } from '@readapt/settings'

interface Props {
  contentToAdapt: string
  settings: Settings
  scope?: string
  adaptHtmlElementAsync: Promise<AdaptHtmlElementFn>
}
const props = withDefaults(defineProps<Props>(), {
  scope: 'preview'
})

const isLoading = ref(true)
const containerElement = ref<HTMLDivElement>()

const adaptContent = async () => {
  if (containerElement.value && props.contentToAdapt && props.adaptHtmlElementAsync) {
    containerElement.value.innerHTML = props.contentToAdapt
    const adaptHtmlElement = await props.adaptHtmlElementAsync
    adaptHtmlElement(containerElement.value, props.settings, props.scope)
    isLoading.value = false
  }
}

watch(
  () => ({
    ...props,
    containerElement
  }),
  adaptContent,
  { deep: true, flush: 'post' }
)

onUnmounted(() => removeStyleElement(props.scope))
</script>
<template>
  <div>
    <template v-if="isLoading">
      <div class="flex h-full flex-col content-center items-center">
        <div class="text-xl">{{ $t('LOADING') }}...</div>
      </div>
    </template>

    <div :class="{ 'opacity-50': isLoading }">
      <div ref="containerElement"></div>
    </div>
  </div>
</template>
