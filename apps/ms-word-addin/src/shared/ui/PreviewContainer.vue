<script lang="ts" setup>
// TODO: add unit tests
import { ref, unref } from 'vue'

type Props = {
  contentToAdapt: string
}
defineProps<Props>()

interface Emits {
  (event: 'update', text: string): void
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
    <textarea ref="textToAdaptElement" class="textarea mx-2 max-h-full w-full" rows="5" :value="contentToAdapt" :hidden="isReading" @blur="onRead" />

    <div v-if="isReading" class="m-px cursor-pointer hover:outline-1 hover:outline-gray-200 hover:outline" @click="onEdit">
      <slot>
        <!--fallback -->
        <div v-html="contentToAdapt"></div>
      </slot>
    </div>
  </div>
</template>
