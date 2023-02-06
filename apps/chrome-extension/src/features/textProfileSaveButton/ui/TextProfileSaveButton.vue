<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import type { Settings } from '@readapt/settings'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: TextProfileId | null
  settings: Settings
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', profileId: TextProfileId | null): void
}>()

const onClick = () => (props.modelValue ? update() : create())

const { preferences, createProfile, updateProfile } = useTextPreferences()
const { t } = useI18n()

const update = () => {
  if (props.modelValue) {
    updateProfile(props.modelValue, { settings: props.settings })
    alert(t('SETTINGS.PROFILE_UPDATED'))
  }
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
  emit('update:modelValue', newProfileId)
  alert(t('SETTINGS.PROFILE_CREATED'))
}

const profileNameExists = (profileName: string): boolean => {
  return preferences.profiles.some(({ name }) => name === profileName)
}
</script>
<template>
  <button class="btn-primary btn-sm btn" data-test-id="save" @click="onClick">
    {{ t('SETTINGS.SAVE') }}
  </button>
</template>
