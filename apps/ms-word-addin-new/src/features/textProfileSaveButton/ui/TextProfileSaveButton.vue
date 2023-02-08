<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import type { Settings } from '@readapt/settings'
import { nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { alert, prompt } from '@/shared/ui/dialog'

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

const update = async () => {
  if (props.modelValue) {
    updateProfile(props.modelValue, { settings: props.settings })
    await alert(t('SETTINGS.PROFILE_UPDATED'))
  }
}

const create = async () => {
  const MAX_PROFILES = 20
  if (preferences.profiles.length === MAX_PROFILES) {
    await alert(t('SETTINGS.PROFILES_MAX'))
    return
  }
  const newProfileName = await prompt(t('SETTINGS.PROFILE_GIVE_NAME'))
  if (!newProfileName) {
    return
  }
  if (profileNameExists(newProfileName)) {
    await alert(t('SETTINGS.PROFILE_NAME_EXISTS', { name: newProfileName }))
    return
  }
  const newProfileId = createProfile({
    settings: props.settings,
    name: newProfileName
  })
  await nextTick()
  emit('update:modelValue', newProfileId)
  await alert(t('SETTINGS.PROFILE_CREATED'))
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
