<script lang="ts" setup>
import { ref } from 'vue'
import { type ColorOption, colors } from '@readapt/settings'
import SvgIcon from '@/shared/ui/SvgIcon.vue'

interface Props {
  value?: string
  colors?: ColorOption[]
}
withDefaults(defineProps<Props>(), {
  value: '',
  colors: () => colors
})

interface Emits {
  (event: 'selectColor', value?: ColorOption)
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
    <button @click="openModal" class="btn-ghost btn">
      <div v-if="value" class="h-8 w-8 rounded-full" :style="{ backgroundColor: value }" />
      <SvgIcon v-else id="forbidden" class="h-8 w-8" />
    </button>
    <div class="modal" :class="{ 'modal-open': isModalOpened }">
      <div class="modal-box relative">
        <label class="btn-sm btn-circle btn absolute right-2 top-2" @click="closeModal">✕</label>
        <div class="flex flex-wrap">
          <template v-for="color in colors">
            <button
              class="btn-circle btn m-2"
              :key="color"
              :style="{ backgroundColor: `${color}` }"
              :class="{ 'outline outline-offset-2 outline-4 outline-black': color === value }"
              @click="selectColor(color)"
            />
          </template>
          <button @click="selectColor()" class="btn-ghost btn-circle btn m-2" :class="{ 'outline outline-offset-2 outline-4 outline-black': !value }">
            <SvgIcon id="forbidden" class="h-full w-full" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
