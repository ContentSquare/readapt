<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import type { Settings } from '@readapt/settings'
import { BButton } from 'bootstrap-vue'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n-composable'

const props = defineProps<{
  value: TextProfileId | null
  settings: Settings
}>()

const emit = defineEmits<{
  (event: 'input', profileId: TextProfileId | null): void
}>()

const onClick = () => (props.value ? update() : create())

const { preferences, createProfile, updateProfile } = useTextPreferences()
const { t } = useI18n()

const update = () => {
  updateProfile(props.value, { settings: props.settings })
  alert(t('SETTINGS.PROFILE_UPDATED'))
}

const create = async () => {
  const MAX_PROFILES = 20
  if (preferences.profiles.length === MAX_PROFILES) {
    alert(t('SETTINGS.PROFILES_MAX'))
    return
  }
  const newProfileName = prompt(t('SETTINGS.PROFILE_GIVE_NAME'))
  if (!newProfileName) {
    return
  }
  if (profileNameExists(newProfileName)) {
    alert(t('SETTINGS.PROFILE_NAME_EXISTS', { name: newProfileName }))
    return
  }
  const newProfileId = createProfile({
    settings: props.settings,
    name: newProfileName
  })
  await nextTick()
  emit('input', newProfileId)
  alert(t('SETTINGS.PROFILE_CREATED'))
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
