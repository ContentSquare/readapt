<script lang="ts">
import { defineComponent, PropType, ref, onUnmounted, watch } from '@vue/composition-api'
import { BSpinner } from 'bootstrap-vue'

import { AdaptHtmlElementFn, removeStyleElement } from '@readapt/visual-engine'
import { Settings } from '@readapt/settings'

const AdaptContainer = defineComponent({
  components: { BSpinner },
  props: {
    contentToAdapt: { type: String, required: true },
    settings: { type: Object as PropType<Settings>, required: true },
    scope: { type: String, default: 'preview' },
    adaptHtmlElementAsync: { type: Promise as PropType<Promise<AdaptHtmlElementFn>>, required: true }
  },
  setup(props) {
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

    return { isLoading, containerElement }
  }
})
export default AdaptContainer
</script>
<template>
  <div>
    <template v-if="isLoading">
      <div class="d-flex h-100 align-items-center justify-content-center flex-column">
        <b-spinner label="Loading..." variant="primary"></b-spinner>
        <div>{{ $t('LOADING') }}...</div>
      </div>
    </template>

    <div :class="{ loading: isLoading }">
      <div ref="containerElement"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  opacity: 0.5;
  background-color: var(--light);
}
</style>
