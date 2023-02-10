<script setup lang="ts">
/* global Office */
import { onMounted, ref, computed } from 'vue'

const userPlatform = ref<Office.PlatformType>()
const isNotMacOS = computed(() => userPlatform.value !== Office.PlatformType.Mac)

onMounted(() => {
  Office.onReady((info: { platform: Office.PlatformType }) => {
    userPlatform.value = info.platform
  })
})

const print = () => window.print()
</script>
<template>
  <button v-if="isNotMacOS" class="btn-xs btn" @click="print">
    {{ $t('DIALOG_BOX.PRINT') }}
  </button>
</template>
