<script setup lang="ts">
import { useTextPreferences, type TextProfileId, type TextSettings } from '@/entities/textPreferences'
import { buildDefaultSettings } from '@readapt/settings'
import isEqual from 'lodash-es/isEqual'
import { useI18n } from 'vue-i18n-composable'

const { preferences, getProfileById } = useTextPreferences()

const props = defineProps<{
  value: TextProfileId | null
  settings: TextSettings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const onChange = (event: Event) => {
  if (validateUnsavedChanges()) {
    const profileId = event.target.value ? parseInt(event.target.value) : null
    emit('input', profileId)
  } else {
    event.target.value = String(props.value ?? '')
  }
}

const { t } = useI18n()

const validateUnsavedChanges = () => {
  const defaultSettings = props.value ? getProfileById(props.value)?.settings : buildDefaultSettings('en')
  if (defaultSettings && isEqual(defaultSettings, props.settings)) {
    return true
  }
  return confirm(t('SETTINGS.PROFILE_UNSAVED_CHANGES'))
}
</script>
<template>
  <select class="select-primary select select-sm" :value="props.value" @change="onChange">
    <option value="">{{ t('SETTINGS.PROFILE_NEW') }}</option>
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
