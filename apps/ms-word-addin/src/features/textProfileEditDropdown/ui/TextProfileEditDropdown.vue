<script setup lang="ts">
import { useTextPreferences, type TextProfileId, type TextSettings } from '@/entities/textPreferences'
import { buildDefaultSettings } from '@readapt/settings'
import isEqual from 'lodash-es/isEqual'
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import { confirm } from '@/shared/ui/dialog'

const { preferences, getProfileById } = useTextPreferences()

const props = defineProps<{
  modelValue: TextProfileId | null
  settings: TextSettings
}>()
const { modelValue, settings } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:modelValue', profileId: TextProfileId | null): void
}>()

const onChange = async (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (await validateUnsavedChanges()) {
    const profileId = target.value ? parseInt(target.value) : null
    emit('update:modelValue', profileId)
  } else {
    target.value = String(props.modelValue ?? '')
  }
}

const { t } = useI18n()

const validateUnsavedChanges = async () => {
  const defaultSettings = modelValue.value ? getProfileById(modelValue.value)?.settings : buildDefaultSettings('en')
  if (defaultSettings && isEqual(defaultSettings, settings.value)) {
    return true
  }
  return await confirm(t('SETTINGS.PROFILE_UNSAVED_CHANGES'))
}
</script>
<template>
  <select class="select-secondary select select-sm" :value="modelValue" @change="onChange">
    <option value="">{{ t('SETTINGS.PROFILE_NEW') }}</option>
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
