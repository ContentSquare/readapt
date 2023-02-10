<script setup lang="ts">
import { closeDialog } from 'vue3-promise-dialog'

defineProps<{ text: string }>()

defineExpose({
  returnValue: () => true
})
</script>
<script></script>
<template>
  <div class="modal modal-open">
    <div class="modal-box">
      <p>{{ text }}</p>
      <div class="modal-action">
        <button class="btn-outline btn-sm btn w-24" @click="closeDialog(false)">Cancel</button>
        <button class="btn-primary btn-sm btn w-24" @click="closeDialog()">OK</button>
      </div>
    </div>
  </div>
</template>
