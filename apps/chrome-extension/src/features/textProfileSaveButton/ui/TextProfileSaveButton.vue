<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'
import { nextTick } from 'vue'

const props = defineProps<{
  value: TextProfileId | null
  settings: Settings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const onClick = () => (props.value ? update() : create())

const { preferences, createProfile, updateProfile } = useTextPreferences()

const update = () => {
  updateProfile(props.value, { settings: props.settings })
  alert('The profile has been updated!')
}

const create = async () => {
  const newProfileName = prompt("What's the new profile name?")
  if (!newProfileName) {
    return
  }
  if (profileNameExists(newProfileName)) {
    alert(`A profile with "${newProfileName}" name already exists! Please try another name.`)
    return
  }
  const MAX_PROFILES = 20
  if (preferences.profiles.length === MAX_PROFILES) {
    alert('You can have up to 20 profiles. Please delete some profiles and try again.')
    return
  }
  const newProfileId = createProfile({
    settings: props.settings,
    name: newProfileName
  })
  await nextTick()
  emit('input', newProfileId)
  alert('The profile has been created!')
}

const profileNameExists = (profileName: string): boolean => {
  return preferences.profiles.some(({ name }) => name === profileName)
}
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onClick">
    {{ $t('SETTINGS.SAVE') }}
  </b-button>
</template>
