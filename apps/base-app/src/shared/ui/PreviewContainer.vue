<script lang="ts" setup>
// TODO: add unit tests
import { ref, unref } from 'vue'

interface Props {
  contentToAdapt: string
}
defineProps<Props>()

interface Emits {
  (event: 'update', text: string)
}
const emit = defineEmits<Emits>()
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
</script>
<template>
  <div :class="{ 'p-3': !isReading }">
    <textarea class="textarea mx-2 max-h-full w-full" rows="5" ref="textToAdaptElement" :value="contentToAdapt" @blur="onRead" :hidden="isReading" />

    <div v-if="isReading" @click="onEdit" class="m-px cursor-pointer hover:outline-1 hover:outline-gray-200 hover:outline">
      <slot>
        <!--fallback -->
        <div v-html="contentToAdapt"></div>
      </slot>
    </div>
  </div>
</template>
