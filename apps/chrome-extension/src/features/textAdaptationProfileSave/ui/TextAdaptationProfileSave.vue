<script lang="ts" setup>
import { useTextAdaptationPreferences, TextAdaptationProfileId } from '@/entities/textAdaptationPreferences'
import { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'
import { nextTick } from 'vue'

const props = defineProps<{
  value: TextAdaptationProfileId | null
  settings: Settings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextAdaptationProfileId | null): void
}>()

const { createProfile, updateProfileSettings, preferencesState } = useTextAdaptationPreferences()

const onClick = () => (props.value ? update() : create())

const update = () => {
  updateProfileSettings(props.value, props.settings)
  alert('The profile has been updated!')
}

const create = async () => {
  const newProfileName = prompt('What is the name of the new profile?')
  if (!newProfileName) {
    return
  }
  if (existsProfileWithName(newProfileName)) {
    alert('A profile with this name already exists...')
    return
  }
  const newProfileId = createProfile({
    settings: props.settings,
    name: newProfileName
  })
  await nextTick()
  emit('input', newProfileId)
  alert('The new profile has been created!')
}

const existsProfileWithName = (profileName: string): boolean => {
  return preferencesState.profiles.some(({ name }) => name === profileName)
}
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onClick">
    <!-- {{ $t('SETTINGS.SAVE') }} -->
    Save
  </b-button>
</template>
