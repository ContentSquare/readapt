<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <button class="btn-accent btn" @click="() => {}">
    {{ t('MAIN_MENU.ADAPT_SELECTION') }}
  </button>
</template>
