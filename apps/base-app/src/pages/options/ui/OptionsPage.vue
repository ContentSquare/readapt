<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n-composable'

import { BCol, BNav, BNavItem, BRow } from 'bootstrap-vue'

import { CloseSettings } from '@readapt/shared-components'
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { TextProfileEditDropdown } from '@/features/textProfileEditDropdown'
import { TextProfileSaveButton } from '@/features/textProfileSaveButton'
import { TextAdaptationPreview } from '@/features/textAdaptationPreview'
import { TextProfileRenameButton } from '@/features/textProfileRenameButton'
import { TextProfileDeleteButton } from '@/features/textProfileDeleteButton'
import { useFormSettings } from '../model/useFormSettings'
import BaseTabs from '@/shared/ui/BaseTabs.vue'

import SettingsMenuGeneral from '@/views/SettingsMenuGeneral.vue'
import SettingsMenuTableItems from '@/views/SettingsMenuTableItems.vue'
import { TextSettingsFileDownload } from '@/features/textSettingsFileDownload'

import utils from '@/chrome'
import { useRouter } from 'vue-router/composables'
import { getLangConfig } from '@readapt/settings'

const router = useRouter()

const { preferences } = useTextPreferences()
const selectedProfiledId = ref<TextProfileId | null>(null)
onMounted(() => {
  if ('editActiveProfile' in router.currentRoute.query) {
    selectedProfiledId.value = preferences.activeProfileId
  } else if ('profileId' in router.currentRoute.query) {
    selectedProfiledId.value = parseInt(router.currentRoute.query.profileId)
  }
})

const { settings, language, setLanguage, updateSettings } = useFormSettings(selectedProfiledId)
const languageConfig = computed(() => getLangConfig(language.value))
const { t } = useI18n()

const tabNames = [t('SETTINGS.GENERAL_SETTINGS'), t('SETTINGS.PHONEME_SETTINGS'), t('SETTINGS.LETTER_SETTINGS')]
const activeTabIndex = ref(0)

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
    <BaseTabs :names="tabNames" v-model="activeTabIndex" />
    <b-row class="mt-2" style="max-height: 80vh; height: 80vh">
      <b-col lg="8">
        <SettingsMenuGeneral
          v-if="activeTabIndex === 0"
          :settings="settings"
          @update="updateSettings($event.key, $event.value)"
          @change-language="setLanguage($event)"
        >
        </SettingsMenuGeneral>
        <SettingsMenuTableItems
          v-if="activeTabIndex === 1"
          table-label="SETTINGS.PHONEME"
          switch-all-label="SETTINGS.ALL_PHONEMES_SETTINGS"
          :all-items-active="settings.phonemesActive"
          :items="settings.phonemes"
          :options="languageConfig.phonemeOptions"
          @update-items="updateSettings('phonemes', $event)"
          @update-active="updateSettings('phonemesActive', $event)"
        >
        </SettingsMenuTableItems>
        <SettingsMenuTableItems
          v-if="activeTabIndex === 2"
          table-label="SETTINGS.LETTER"
          switch-all-label="SETTINGS.ALL_LETTERS_SETTINGS"
          :all-items-active="settings.lettersActive"
          :items="settings.letters"
          :options="languageConfig.letterOptions"
          @update-items="updateSettings('letters', $event)"
          @update-active="updateSettings('lettersActive', $event)"
        ></SettingsMenuTableItems>
      </b-col>
      <b-col lg="4">
        <div class="d-flex flex-column align-content-between h-100">
          <h3>{{ t('SETTINGS.TEXT_PREVIEW') }}</h3>
          <TextAdaptationPreview class="preview-container" :settings="settings" />

          <div class="d-flex justify-content-between mt-3">
            <TextProfileSaveButton v-model="selectedProfiledId" :settings="settings" />
            <TextProfileDeleteButton class="ml-3 mr-auto" v-model="selectedProfiledId" />
            <!-- TODO: review dirty settings calculation -->
            <CloseSettings :is-settings-dirty="false" @close-settings="close" />
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.options-page {
  &__title {
    display: inline;
  }

  &__profiles-dropdown {
    font-size: 24px;
    width: 250px;
  }

  &__profile-rename {
    font-weight: bold;
    font-size: 32px;
    line-height: 1;
    cursor: pointer;
  }
}
.nav-item {
  a {
    font-weight: bold;
    color: rgba(0, 0, 0, 0.48);
    font-size: 15px;
    border-bottom: 1px solid #d1d6df;
    padding: 1rem;

    &.active {
      color: var(--blue);
      border-bottom: 2px solid var(--blue);
    }
  }

  a:hover {
    text-decoration-line: none;
  }
}

.preview-container {
  max-height: 67vh;
  overflow-y: scroll;
}
</style>
