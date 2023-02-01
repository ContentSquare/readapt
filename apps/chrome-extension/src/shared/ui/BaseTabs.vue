<script setup lang="ts">
type Props = {
  modelValue: number
  names: string[]
}
const props = defineProps<Props>()

type Emits = {
  (event: 'update:modelValue', index: number): void
}
const emit = defineEmits<Emits>()

const emitInput = (index: number) => emit('update:modelValue', index)
</script>

<template>
  <div class="tabs">
    <div
      v-for="(name, index) in props.names"
      :key="index"
      class="tab tab-bordered tab-lg"
      :class="{ 'tab-active': index === modelValue }"
      data-test-id="tab"
      @click="emitInput(index)"
    >
      {{ name }}
    </div>
  </div>
</template>
