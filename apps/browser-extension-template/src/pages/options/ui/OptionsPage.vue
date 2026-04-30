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

import { TextSettingsFileDownload } from '@/features/textSettingsFileDownload'

import { useExtensionUtils } from '@/shared/lib/extension'
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

const { closeCurrentTab, saveLocale } = useExtensionUtils()

const { locale, t } = useI18n()

const changeLocale = async (lang: 'en' | 'fr') => {
  locale.value = lang
  await saveLocale(lang)
}
</script>
<template>
  <div class="m-auto max-w-screen-lg p-2 text-base">
    <div class="mb-2 flex items-center bg-base-100">
      <div class="mr-4 text-2xl font-semibold">{{ $t('SETTINGS.PROFILE') }}:</div>
      <TextProfileEditDropdown v-model="selectedProfiledId" class="w-60" :settings="settings" />
      <TextProfileRenameButton class="ml-3" :profile-id="selectedProfiledId" />
      <TextSettingsFileDownload class="ml-auto" :settings="settings" />
      <div class="text-right">
        {{ t('MAIN_MENU.MENU_LANGUAGE') }}
        <span v-if="locale === 'fr'">FR</span>
        <a v-if="locale !== 'fr'" href="#/options" @click="changeLocale('fr')">FR</a>
        /
        <span v-if="locale === 'en'">EN</span>
        <a v-if="locale !== 'en'" href="#/options" @click="changeLocale('en')">EN</a>
      </div>
    </div>
    <div class="flex">
      <TextProfileForm class="w-2/3 min-w-[730px]" :settings="settings" @update-settings="updateSettings" @change-language="changeLanguage" />
      <div class="flex w-1/3 flex-1 flex-col pl-4 pt-10">
        <div class="text-2xl font-semibold">{{ $t('SETTINGS.TEXT_PREVIEW') }}</div>
        <TextSettingsAdaptationPreview class="h-items-settings overflow-scroll" :settings="settings" />
        <div class="mt-auto flex flex-wrap justify-between">
          <TextProfileSaveButton v-model="selectedProfiledId" :settings="settings" />
          <TextProfileDeleteButton v-model="selectedProfiledId" class="ml-3 mr-auto" />
          <!-- TODO: add dirty settings calculation -->
          <button class="btn-secondary btn-sm btn" @click="closeCurrentTab()">{{ t('SETTINGS.CLOSE') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>
