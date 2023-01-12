<script lang="ts" setup>
interface Props {
  names: string[]
  value: number
}
const props = defineProps<Props>()

const emit = defineEmits(['input'])
const emitInput = (index: number) => emit('input', index)
</script>

<template>
  <div class="tabs">
    <div
      class="tab tab-bordered tab-lg"
      :class="{ 'tab-active': index === value }"
      data-test-id="tab"
      v-for="(name, index) in props.names"
      :key="index"
      @click="emitInput(index)"
    >
      {{ name }}
    </div>
  </div>
</template>
