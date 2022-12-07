<script setup lang="ts">
import { TextProfileId, TextSettings, useTextPreferences } from '@/entities/textPreferences'
import { buildDefaultSettings } from '@readapt/settings'
import isEqual from 'lodash/isEqual'

const { preferences, getProfileById } = useTextPreferences()

const props = defineProps<{
  value: TextProfileId | null
  settings: TextSettings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const onChange = ({ target }: Event) => {
  const emittedValue = target.value ? Number(target.value) : null
  if (validateUnsavedChanges()) {
    emit('input', emittedValue)
  } else {
    event.target.value = String(props.value ?? '')
  }
}

const validateUnsavedChanges = () => {
  const defaultSettings = props.value ? getProfileById(props.value)?.settings : buildDefaultSettings('en')
  if (defaultSettings && isEqual(defaultSettings, props.settings)) {
    return true
  }
  return confirm('You have unsaved changes. Do you to continue?')
}
</script>
<template>
  <select data-test-id="dropdown" :value="props.value" @change="onChange">
    <option value="">{{ $t('SETTINGS.NEW_PROFILE') }}</option>
    <option v-for="{ name, id } in preferences.profiles" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>
