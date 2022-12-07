<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { useI18n } from 'vue-i18n-composable'

const { preferences, updateProfile, getProfileById } = useTextPreferences()

const props = defineProps<{ profileId: TextProfileId | null }>()
const { t } = useI18n()

const onClick = () => {
  const profileName = getProfileById(props.profileId)?.name
  const newProfileName = prompt("How you'd like to name the profile?", profileName)
  if (!newProfileName) {
    return
  }
  if (isNameUnique(newProfileName)) {
    updateProfile(props.profileId, { name: newProfileName })
    alert('The profile has been renamed')
  } else {
    alert(t('SETTINGS.PROFILE_NAME_EXISTS', { name: newProfileName }))
  }
}

const isNameUnique = (newProfileName: string) => {
  const profileWithNameExists = preferences.profiles.some(({ name, id }) => {
    if (id === props.profileId) {
      return false
    }
    return name === newProfileName
  })

  return !profileWithNameExists
}
</script>
<template>
  <span v-if="props.profileId" data-test-id="rename" @click="onClick">&#x270e;</span>
</template>
