<script lang="ts">
import { adaptHtmlElementAsync } from '@/visualEngine/adaptHtmlElementAsync'
import { removeStyleElement } from '@readapt/visual-engine'
import { Settings } from '@readapt/settings'
import { defineComponent, PropType, ref, watchEffect, onMounted, onUnmounted } from '@vue/composition-api'
import { BSpinner } from 'bootstrap-vue'

const PreviewContainer = defineComponent({
  components: { BSpinner },
  props: {
    contentToAdapt: { type: String, required: true },
    settings: { type: Object as PropType<Settings>, required: true },
    scope: { type: String, default: 'preview' }
  },
  setup(props, { emit }) {
    const isLoading = ref(true)
    const containerElement = ref<HTMLDivElement>()
    const contentElement = ref<HTMLParagraphElement>()

    const adaptContent = async () => {
      if (containerElement.value && contentElement.value && props.contentToAdapt) {
        contentElement.value.innerHTML = props.contentToAdapt
        await adaptHtmlElementAsync(containerElement.value, props.settings, props.scope)
        isLoading.value = false
        emit('ready') // Only for ms-word addin
      }
    }

    watchEffect(() => adaptContent(), { flush: 'post' })

    onMounted(() => adaptContent())

    onUnmounted(() => removeStyleElement(props.scope))

    const onClick = () => emit('edit')

    return { isLoading, containerElement, contentElement, onClick }
  }
})
export default PreviewContainer
</script>
<template>
  <div class="adapt-container">
    <template v-if="isLoading">
      <div class="d-flex h-100 align-items-center justify-content-center flex-column">
        <b-spinner label="Loading..." variant="primary"></b-spinner>
        <div>{{ $t('LOADING') }}...</div>
      </div>
    </template>

    <div :class="{ loading: isLoading }">
      <div ref="containerElement" @click="onClick">
        <p ref="contentElement" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  opacity: 0.5;
  background-color: var(--light);
}
</style>
