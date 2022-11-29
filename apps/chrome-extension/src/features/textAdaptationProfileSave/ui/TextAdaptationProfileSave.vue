<script lang="ts" setup>
import { useTextAdaptationPreferences, TextAdaptationPreferencesFixtures } from '@/entities/textAdaptationPreferences'
import { BButton } from 'bootstrap-vue'

const { preferencesState, addProfile } = useTextAdaptationPreferences()

const onSave = () => {
  const newProfileName = prompt('What is the name of the new profile?')
  addProfile({
    ...TextAdaptationPreferencesFixtures.profile,
    name: newProfileName
  })
}
</script>
<template>
  <b-button data-test-id="save" size="sm" variant="primary" @click="onSave">
    {{ $t('SETTINGS.SAVE') }}
  </b-button>
</template>
