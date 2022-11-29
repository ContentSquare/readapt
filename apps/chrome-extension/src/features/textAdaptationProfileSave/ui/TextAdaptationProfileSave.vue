<script lang="ts" setup>
import { useTextAdaptationPreferences, TextAdaptationProfileId } from '@/entities/textAdaptationPreferences'
import { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'

const props = defineProps<{
  value: TextAdaptationProfileId | undefined
  settings: Settings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextAdaptationProfileId | undefined): void
}>()

const { createProfile, updateProfileSettings } = useTextAdaptationPreferences()

const onSave = () => {
  if (props.value === undefined) {
    const newProfileName = prompt('What is the name of the new profile?')
    const newProfileId = createProfile({
      settings: props.settings,
      name: newProfileName
    })
    alert('The new profile has been created!')
    emit('input', newProfileId)
  } else {
    updateProfileSettings(props.value, props.settings)
    alert('The profile has been updated!')
  }
}
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onSave">
    <!-- {{ $t('SETTINGS.SAVE') }} -->
    Save
  </b-button>
</template>
