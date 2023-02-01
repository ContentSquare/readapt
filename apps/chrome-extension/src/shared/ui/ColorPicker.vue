<script lang="ts" setup>
import { ref } from 'vue'
import { type ColorOption, colors } from '@readapt/settings'
import SvgIcon from '@/shared/ui/SvgIcon.vue'

type Props = {
  modelValue: string | null
  colors?: readonly ColorOption[]
}
withDefaults(defineProps<Props>(), {
  modelValue: null,
  colors: () => colors
})

interface Emits {
  (event: 'selectColor', value?: ColorOption): void
}
const emit = defineEmits<Emits>()

const isModalOpened = ref(false)
const openModal = () => (isModalOpened.value = true)
const closeModal = () => (isModalOpened.value = false)

const selectColor = (value?: ColorOption): void => {
  closeModal()
  emit('selectColor', value)
}
</script>

<template>
  <div>
    <button class="btn-ghost btn" data-test-id="main-button" @click="openModal">
      <div v-if="modelValue" data-test-id="colored-icon" class="h-8 w-8 rounded-full" :style="{ backgroundColor: modelValue }" />
      <SvgIcon v-else id="forbidden" class="h-8 w-8" data-test-id="missing-color-icon" />
    </button>
    <div class="modal" data-test-id="modal" :class="{ 'modal-open': isModalOpened }">
      <div class="modal-box relative">
        <label class="btn-sm btn-circle btn absolute right-2 top-2" @click="closeModal">✕</label>
        <div class="flex flex-wrap">
          <template v-for="color in colors" :key="color">
            <button
              class="btn-circle btn m-2"
              data-test-id="color-button"
              :style="{ backgroundColor: `${color}` }"
              :class="{ 'outline outline-offset-2 outline-4 outline-black': color === modelValue }"
              @click="selectColor(color)"
            />
          </template>
          <button
            class="btn-ghost btn-circle btn m-2"
            :class="{ 'outline outline-offset-2 outline-4 outline-black': !modelValue }"
            data-test-id="missing-color-button"
            @click="selectColor()"
          >
            <SvgIcon id="forbidden" class="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
