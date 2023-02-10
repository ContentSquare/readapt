<script setup lang="ts">
import { ref } from 'vue'
const isDisplayed = ref(true)

const dismiss = () => (isDisplayed.value = false)
</script>

<template>
  <div v-if="isDisplayed" class="alert relative m-4 block w-auto shadow-lg">
    <div class="btn-sm btn-circle btn absolute right-2 top-2" @click="dismiss">✕</div>
    <div class="text-lg font-semibold">{{ $t('DIALOG_BOX.FLOATING_IMAGES_TITLE') }}</div>
    <div class="p-1 text-sm">{{ $t('DIALOG_BOX.FLOATING_IMAGES_EXPLANATION') }}</div>
    <div class="p-1 text-sm">
      {{ $t('DIALOG_BOX.FLOATING_IMAGES_LEARN_MORE') }}
      <a class="link" target="_blank" :href="$t('DIALOG_BOX.FLOATING_IMAGES_SUPPORT_LINK')">{{ $t('DIALOG_BOX.FLOATING_IMAGES_CLICK_HERE') }}</a>
    </div>
  </div>
</template>
