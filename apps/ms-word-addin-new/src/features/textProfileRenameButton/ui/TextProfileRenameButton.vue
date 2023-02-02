<script lang="ts" setup>
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import SvgIcon from '@/shared/ui/SvgIcon.vue'
import { useI18n } from 'vue-i18n'

const { preferences, updateProfile, getProfileById } = useTextPreferences()

const props = defineProps<{ profileId: TextProfileId | null }>()
const { t } = useI18n()

const onClick = () => {
  let profileName = ''
  if (props.profileId) {
    profileName = getProfileById(props.profileId).name
  }
  const newProfileName = prompt(t('SETTINGS.PROFILE_RENAME_TO'), profileName)
  if (!newProfileName || !props.profileId) {
    return
  }
  if (isNameUnique(newProfileName)) {
    updateProfile(props.profileId, { name: newProfileName })
    alert(t('SETTINGS.PROFILE_RENAMED'))
  } else {
    alert(t('SETTINGS.PROFILE_NAME_EXISTS', { name: newProfileName }))
  }
}

const isNameUnique = (newProfileName: string) => {
  const profileWithNameExists = preferences.profiles.some(({ name, id }) => {
    return id !== props.profileId && name === newProfileName
  })
  return !profileWithNameExists
}
</script>
<template>
  <button v-if="props.profileId" class="btn-outline btn-secondary btn-sm btn" :title="t('SETTINGS.PROFILE_RENAME')" @click="onClick">
    <SvgIcon id="edit" class="h-4 w-4 fill-current" />
  </button>
</template>
