<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { TextProfileEditDropdown } from '@/features/textProfileEditDropdown'
import { TextProfileSaveButton } from '@/features/textProfileSaveButton'
import { TextSettingsAdaptationPreview } from '@/features/textSettingsAdaptationPreview'
import { TextProfileRenameButton } from '@/features/textProfileRenameButton'
import { TextProfileDeleteButton } from '@/features/textProfileDeleteButton'
import { useFormSettings } from '../model/useFormSettings'
import { TextProfileForm } from '@/features/textProfileForm'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()

const { preferences } = useTextPreferences()
// TODO: extract profile selection into a composable
const selectedProfiledId = ref<TextProfileId | null>(null)
onMounted(() => {
  const { query } = router.currentRoute.value
  if ('editActiveProfile' in query) {
    selectedProfiledId.value = preferences.activeProfileId
  } else if ('profileId' in query) {
    selectedProfiledId.value = parseInt(String(query.profileId))
  }
})

const { settings, changeLanguage, updateSettings } = useFormSettings(selectedProfiledId)

const { t } = useI18n()
</script>
<template>
  <div class="m-auto flex max-h-screen flex-col p-2 text-base">
    <div class="mb-2 flex items-center bg-base-100">
      <TextProfileEditDropdown v-model="selectedProfiledId" class="w-60" :settings="settings" />
      <TextProfileRenameButton class="ml-3" :profile-id="selectedProfiledId" />
    </div>
    <TextProfileForm class="" :settings="settings" @update-settings="updateSettings" @change-language="changeLanguage" />
    <div>
      <TextSettingsAdaptationPreview class="my-2 h-40 max-h-40 overflow-scroll" :settings="settings" />
      <div class="mt-auto flex flex-wrap justify-between">
        <TextProfileSaveButton v-model="selectedProfiledId" :settings="settings" />
        <TextProfileDeleteButton v-model="selectedProfiledId" class="ml-3 mr-auto" />
        <!-- TODO: add dirty settings calculation -->
        <button class="btn-outline btn-secondary btn-sm btn" @click="$router.push('/')">{{ t('SETTINGS.BACK') }}</button>
      </div>
    </div>
  </div>
</template>
