<script lang="ts" setup>
import { useTextAdaptationPreferences, TextAdaptationPreferencesFixtures } from '@/entities/textAdaptationPreferences'
import { BButton } from 'bootstrap-vue'

const { createProfile } = useTextAdaptationPreferences()

const onSave = () => {
  const newProfileName = prompt('What is the name of the new profile?')
  createProfile({
    settings: TextAdaptationPreferencesFixtures.settings,
    name: newProfileName
  })
  alert('The new profile has been created!')
}
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onSave">
    <!-- {{ $t('SETTINGS.SAVE') }} -->
    Save
  </b-button>
</template>
