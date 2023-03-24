<script lang="ts" setup>
import { type Language, languageOptions } from '@readapt/settings'
import BaseSelect from '@/shared/ui/BaseSelect.vue'

type Props = {
  modelValue: Language
}
defineProps<Props>()

interface Emits {
  (event: 'update:modelValue', value: Language): void
}
const emit = defineEmits<Emits>()
</script>
<template>
  <BaseSelect :model-value="modelValue" :options="languageOptions" @update:model-value="emit('update:modelValue', $event as Language)" />
</template>
