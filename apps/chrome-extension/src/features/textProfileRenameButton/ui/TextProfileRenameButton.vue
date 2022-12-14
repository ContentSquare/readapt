<script lang="ts" setup>
import { useTextPreferences, TextProfileId } from '@/entities/textPreferences'
import { useI18n } from 'vue-i18n-composable'

const { preferences, updateProfile, getProfileById } = useTextPreferences()

const props = defineProps<{ profileId: TextProfileId | null }>()
const { t } = useI18n()

const onClick = () => {
  const profileName = getProfileById(props.profileId)?.name
  const newProfileName = prompt(t('SETTINGS.PROFILE_RENAME_TO'), profileName)
  if (!newProfileName) {
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
  <span v-if="props.profileId" data-test-id="rename" @click="onClick">
    <img class="text-profile-rename-button__edit-icon" src="/icons/edit.svg" />
  </span>
</template>

<style lang="scss" scoped>
.text-profile-rename-button {
  cursor: pointer;

  &__edit-icon {
    width: 25px;
    height: 24px;
  }
}
</style>
