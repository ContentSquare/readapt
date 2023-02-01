<script lang="ts" setup>
import { computed } from 'vue'
import SvgIcon from '@/shared/ui/SvgIcon.vue'
import { useI18n } from 'vue-i18n'

type Props = {
  options: { value: string; text: string }[]
  modelValue: string
}
const props = defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: string): void
}
const emit = defineEmits<Emits>()

const currentIndex = computed(() => {
  const index = props.options.findIndex((option) => option.value === props.modelValue)
  return index === -1 ? 0 : index
})
const currentValue = computed(() => props.options[currentIndex.value].text)
const hasLessOptions = computed(() => currentIndex.value > 0)
const hasMoreOptions = computed(() => currentIndex.value < props.options.length - 1)

const onMinus = () => {
  if (hasLessOptions.value) {
    const value = props.options[currentIndex.value - 1].value
    emit('update:modelValue', value)
  }
}
const onPlus = () => {
  if (hasMoreOptions.value) {
    const value = props.options[currentIndex.value + 1].value
    emit('update:modelValue', value)
  }
}

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center justify-between">
    <button class="btn-ghost btn" :class="{ 'bg-transparent btn-disabled': !hasLessOptions }" data-test-id="btn-minus" @click="onMinus">
      <SvgIcon id="minus" class="h-6 w-6 fill-current" />
    </button>
    <div data-test-id="value" class="w-28 text-center font-semibold">{{ t(currentValue) }}</div>
    <button class="btn-ghost btn" :class="{ 'bg-transparent btn-disabled': !hasMoreOptions }" data-test-id="btn-plus" @click="onPlus">
      <SvgIcon id="plus" class="h-6 w-6 fill-current" />
    </button>
  </div>
</template>
