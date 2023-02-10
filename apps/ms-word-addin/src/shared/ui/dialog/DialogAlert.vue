<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { closeDialog } from 'vue3-promise-dialog'

defineProps<{ text: string }>()

defineExpose({
  returnValue: () => undefined
})

const button = ref<HTMLButtonElement>()
onMounted(() => button.value?.focus())
</script>
<script></script>
<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <p>{{ text }}</p>
      <div class="modal-action">
        <button ref="button" class="btn-primary btn-sm btn w-24" @click="closeDialog()">OK</button>
      </div>
    </div>
  </div>
</template>
