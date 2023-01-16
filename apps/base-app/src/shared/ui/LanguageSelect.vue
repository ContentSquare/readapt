<script lang="ts" setup>
import { type Language, languageOptions } from '@readapt/settings'
import BaseSelect from '@/shared/ui/BaseSelect.vue'

interface Props {
  value: Language
}
defineProps<Props>()

interface Emits {
  (event: 'input', value: Language)
}
const emit = defineEmits<Emits>()
</script>
<template>
  <BaseSelect :value="value" :options="languageOptions" @input="emit('input', $event)" />
</template>
