<script lang="ts" setup>
import { computed } from 'vue'

type IconId = string
const props = defineProps<{ id: IconId }>()

const FRAGMENTS_URL = '/icons/fragments.svg'
const href = computed(() => `${FRAGMENTS_URL}#${props.id}`)
</script>

<template>
  <svg data-test-id="icon">
    <use :xlinkHref="href" :href="href"></use>
  </svg>
</template>
