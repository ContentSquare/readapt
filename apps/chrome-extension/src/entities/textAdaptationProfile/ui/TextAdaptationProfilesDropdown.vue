<script setup lang="ts">
import { PropType } from 'vue/types/v3-component-props'

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true
  }
})
</script>
<template>
  <select data-test-id="dropdown">
    <option v-for="(option, index) in props.options" :key="index">{{ option }}</option>
  </select>
</template>
