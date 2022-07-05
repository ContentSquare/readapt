<script lang="ts">
import { Settings } from '@readapt/settings'
import { defineComponent, PropType, ref, watch } from '@vue/composition-api'
import AdaptContainer from './AdaptContainer.vue'

const PreviewContainer = defineComponent({
  components: { AdaptContainer },
  props: {
    contentToAdapt: { type: String, required: true },
    settings: { type: Object as PropType<Settings>, required: true },
    scope: { type: String, default: 'preview' }
  },
  setup(props) {
    const textToAdaptElement = ref<HTMLTextAreaElement>()
    const isReading = ref(true)

    const onRead = () => {
      isReading.value = true
    }

    const onEdit = () => {
      isReading.value = false
      setTimeout(() => textToAdaptElement.value?.focus())
    }

    const textToAdapt = ref(props.contentToAdapt)
    watch([textToAdapt, isReading], () => {
      if (isReading.value && !/\S/.test(textToAdapt.value)) {
        textToAdapt.value = props.contentToAdapt
      }
    })
    watch(
      () => props.contentToAdapt,
      () => (textToAdapt.value = props.contentToAdapt)
    )

    return { textToAdapt, textToAdaptElement, isReading, onRead, onEdit }
  }
})
export default PreviewContainer
</script>
<template>
  <div class="mb-auto">
    <textarea class="textarea-container form-control" rows="5" ref="textToAdaptElement" v-model="textToAdapt" @blur="onRead" :hidden="isReading" />

    <div v-if="isReading" @click="onEdit">
      <AdaptContainer class="adapt-container" :content-to-adapt="$sanitize('<p>' + textToAdapt + '</p>')" :settings="settings" :scope="scope" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adapt-container {
  cursor: pointer;

  &:hover {
    outline: 1px solid #dee2e6;
  }
}
</style>
