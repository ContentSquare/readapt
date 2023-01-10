<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { CloseSettings } from '@readapt/shared-components'
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { TextProfileEditDropdown } from '@/features/textProfileEditDropdown'
import { TextProfileSaveButton } from '@/features/textProfileSaveButton'
import { TextAdaptationPreview } from '@/features/textAdaptationPreview'
import { TextProfileRenameButton } from '@/features/textProfileRenameButton'
import { TextProfileDeleteButton } from '@/features/textProfileDeleteButton'
import { useFormSettings } from '../model/useFormSettings'
import { TextProfileForm } from '@/features/textProfileForm'

import { TextSettingsFileDownload } from '@/features/textSettingsFileDownload'

import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'

const router = useRouter()

const { preferences } = useTextPreferences()
// TODO: extract profile selection into a composable
const selectedProfiledId = ref<TextProfileId | null>(null)
onMounted(() => {
  if ('editActiveProfile' in router.currentRoute.query) {
    selectedProfiledId.value = preferences.activeProfileId
  } else if ('profileId' in router.currentRoute.query) {
    selectedProfiledId.value = parseInt(router.currentRoute.query.profileId)
  }
})

const { settings, changeLanguage, updateSettings } = useFormSettings(selectedProfiledId)

const close = async () => await utils.closeCurrentTab()
</script>
<template>
  <div class="p-2">
    <div class="mb-2 flex items-center bg-base-100">
      <div class="mr-4 text-2xl font-semibold">{{ $t('SETTINGS.PROFILE') }}:</div>
      <TextProfileEditDropdown class="w-60" v-model="selectedProfiledId" :settings="settings" />
      <TextProfileRenameButton class="ml-3" :profile-id="selectedProfiledId" />
      <TextSettingsFileDownload class="ml-auto" :settings="settings" />
    </div>
    <div class="flex max-h-[1200px] flex-wrap">
      <TextProfileForm
        class="max-h-full w-2/3 overflow-auto"
        :settings="settings"
        @update-settings="updateSettings"
        @change-language="changeLanguage"
      />
      <div class="flex w-1/3 min-w-[300px] flex-col pl-4 pt-14">
        <div class="text-2xl font-semibold">{{ $t('SETTINGS.TEXT_PREVIEW') }}</div>
        <TextAdaptationPreview :settings="settings" />

        <div class="mt-auto flex justify-between">
          <TextProfileSaveButton v-model="selectedProfiledId" :settings="settings" />
          <TextProfileDeleteButton class="ml-3 mr-auto" v-model="selectedProfiledId" />
          <!-- TODO: review dirty settings calculation -->
          <CloseSettings :is-settings-dirty="false" @close-settings="close" />
        </div>
      </div>
    </div>
  </div>
</template>
