<script lang="ts">
import { adaptHtmlElementAsync } from '@/visualEngine/adaptHtmlElementAsync'
import { removeStyleElement } from '@readapt/visual-engine'
import { Settings } from '@readapt/settings'
import { defineComponent, PropType, ref, watch, watchEffect, onUnmounted } from '@vue/composition-api'

const AdaptContainer = defineComponent({
  props: {
    contentToAdapt: { type: String, required: true },
    settings: { type: Object as PropType<Settings>, required: true },
    scope: { type: String, default: 'preview' }
  },
  setup(props, { emit }) {
    const containerElement = ref<HTMLParagraphElement>()

    const ready = ref(false)

    onUnmounted(() => removeStyleElement(props.scope))

    watch(ready, (isReadyNow) => isReadyNow && emit('ready'))

    watchEffect(
      async () => {
        if (containerElement.value && props.contentToAdapt) {
          containerElement.value.innerHTML = props.contentToAdapt
          await adaptHtmlElementAsync(containerElement.value, props.settings, props.scope)
          // ready after first adaptation
          ready.value = true
        }
      },
      { flush: 'post' }
    )

    return { containerElement }
  }
})
export default AdaptContainer
</script>
<template>
  <div ref="containerElement" />
</template>
