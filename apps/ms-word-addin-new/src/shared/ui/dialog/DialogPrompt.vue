<script setup lang="ts">
import { closeDialog } from 'vue3-promise-dialog'
import { onMounted, ref } from 'vue'

const props = defineProps<{ text: string; initialValue: string }>()

defineExpose({
  returnValue: () => inputValue.value
})

const inputValue = ref(props.initialValue)
const input = ref<HTMLInputElement>()
onMounted(() => input.value?.focus())
</script>
<script></script>
<template>
  <div class="modal modal-open">
    <div class="modal-box max-w-md">
      <p>{{ text }}</p>
      <input ref="input" v-model="inputValue" autofocus class="input-bordered input input-sm my-2 w-full" type="text" @keyup.enter="closeDialog()" />
      <div class="modal-action">
        <button class="btn-outline btn-sm btn w-24" @click="closeDialog(null)">Cancel</button>
        <button class="btn-primary btn-sm btn w-24" @click="closeDialog()">OK</button>
      </div>
    </div>
  </div>
</template>
