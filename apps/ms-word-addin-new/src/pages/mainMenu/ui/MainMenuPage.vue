<script lang="ts" setup>
import { computed } from 'vue'

import { useVersion } from '@/shared/lib/useVersion'
import { TextProfileActiveDropdown } from '@/features/textProfileActiveDropdown'
import { TextSettingsAdaptDocumentButton, TextSettingsAdaptSelectionButton } from '@/features/textSettingsAdaptButtons'
import { useTextPreferences } from '@/entities/textPreferences'

import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { useExtensionUtils } from '@/shared/lib/extension'
import SvgIcon from '@/shared/ui/SvgIcon.vue'

const router = useRouter()

const { openOptionsPage, openTemplates, saveLocale } = useExtensionUtils()

const { preferences } = useTextPreferences()
const hasActiveProfile = computed(() => Boolean(preferences.activeProfileId))

const selectTemplate = async () => await openTemplates(router)

const { locale, t } = useI18n()

const changeLocale = async (lang: 'en' | 'fr') => {
  locale.value = lang
  await saveLocale(lang)
}

const version = useVersion()
</script>

<template>
  <div class="mx-auto mt-6 flex max-w-screen-xs flex-wrap gap-4 text-base">
    <div class="flex w-full justify-between">
      <div><span class="text-3xl">Readapt</span> by</div>

      <div class="text-base">
        <span v-if="locale === 'fr'">FR</span>
        <a v-if="locale !== 'fr'" href="#" class="hover:underline" @click="changeLocale('fr')">FR</a>
        /
        <span v-if="locale === 'en'">EN</span>
        <a v-if="locale !== 'en'" href="#" class="hover:underline" @click="changeLocale('en')">EN</a>
      </div>
    </div>
    <img class="mb-4 block w-full" src="/logo.png" width="250" height="63" alt="Readapt Logo" />

    <template v-if="hasActiveProfile">
      <TextSettingsAdaptDocumentButton class="w-full" />
      <TextSettingsAdaptSelectionButton class="w-full" />
      <div class="w-full">
        <div class="text-lg font-semibold">{{ $t('MAIN_MENU.ACTIVE_PROFILE') }}:</div>
        <div class="flex justify-between">
          <TextProfileActiveDropdown class="select-primary flex-1" />
          <button
            :title="$t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE')"
            class="btn-outline btn-primary btn-sm btn ml-1"
            @click="openOptionsPage({ editActiveProfile: '' }, router)"
          >
            <SvgIcon id="edit" class="h-4 w-4 fill-current" />
          </button>
        </div>
      </div>
    </template>

    <button class="btn-primary btn w-full" @click="openOptionsPage({}, router)">
      {{ t('MAIN_MENU.CREATE_BRAND_NEW_PROFILE') }}
    </button>
    <button class="btn-primary btn float-right w-full" @click="selectTemplate">
      {{ t('MAIN_MENU.BASE_YOUR_PROFILE_FROM_TEMPLATE') }}
    </button>

    <div v-if="!hasActiveProfile" class="text-base">
      <div class="my-2">{{ $t('MAIN_MENU.WELCOME_3') }}</div>
      <div class="my-2">{{ $t('MAIN_MENU.WELCOME_1') }}</div>
      <div class="my-2">{{ $t('MAIN_MENU.WELCOME_2') }}</div>
    </div>

    <div class="w-full">
      <div class="mb-1 flex w-full items-center justify-between">
        <a class="link" href="https://forms.gle/tXTeYXhxevafZPF69" target="_blank">
          {{ t('MAIN_MENU.TELL_US_ABOUT_YOU') }}
        </a>
        <a class="link" href="https://forms.gle/cZWVQmhpwuCfbBh39" target="_blank">
          {{ t('MAIN_MENU.CONTACT_US') }}
        </a>
      </div>
      <div class="text-sm">Version {{ version }}</div>
    </div>
  </div>
</template>
