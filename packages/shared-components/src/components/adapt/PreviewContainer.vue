<script lang="ts">
import { defineComponent, ref, unref } from 'vue'

const PreviewContainer = defineComponent({
  props: {
    contentToAdapt: { type: String, required: true }
  },
  setup(props, { emit }) {
    const textToAdaptElement = ref<HTMLTextAreaElement>()
    const isReading = ref(true)

    const onRead = () => {
      isReading.value = true
      const textArea = unref(textToAdaptElement) as HTMLTextAreaElement
      const textToAdapt = textArea.value
      // do not emit if the text is empty
      if (/\S/.test(textToAdapt)) {
        emit('update', textToAdapt)
      }
    }

    const onEdit = () => {
      isReading.value = false
      setTimeout(() => textToAdaptElement.value?.focus())
    }

    return { textToAdaptElement, isReading, onRead, onEdit }
  }
})
export default PreviewContainer
</script>
<template>
  <div class="mb-auto">
    <textarea class="textarea-container form-control" rows="5" ref="textToAdaptElement" :value="contentToAdapt" @blur="onRead" :hidden="isReading" />

    <div v-if="isReading" @click="onEdit" class="adapt-container">
      <slot>
        <!--fallback -->
        <div v-html="contentToAdapt"></div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adapt-container {
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #dee2e6;
  }
}
</style>
