<script lang="ts" setup>
import { computed } from 'vue'

import { useVersion } from '@/shared/lib/useVersion'
import { TextProfileActiveDropdown } from '@/features/textProfileActiveDropdown'
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
  <div class="mx-auto mt-6 flex w-full max-w-screen-xs flex-wrap gap-4 text-base">
    <div v-if="hasActiveProfile" class="w-full">
      <div class="text-lg font-semibold">{{ $t('MAIN_MENU.ACTIVE_PROFILE') }}:</div>
      <div class="flex justify-between">
        <TextProfileActiveDropdown class="w-40" />
        <button
          :title="$t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE')"
          class="btn-outline btn-primary btn-sm btn ml-1"
          @click="openOptionsPage({ editActiveProfile: '' }, router)"
        >
          <SvgIcon id="edit" class="h-4 w-4 fill-current" />
        </button>
      </div>
    </div>

    <div><span class="text-4xl">Readapt</span> by</div>
    <img class="mb-4 block w-full" src="/logo.png" alt="Readapt Logo" />
    <button class="btn-primary btn w-full" @click="openOptionsPage({}, router)">
      {{ t('MAIN_MENU.CREATE_BRAND_NEW_PROFILE') }}
    </button>
    <button class="btn-primary btn float-right w-full" @click="selectTemplate">
      {{ t('MAIN_MENU.BASE_YOUR_PROFILE_FROM_TEMPLATE') }}
    </button>

    <div class="flex w-full items-center justify-between">
      <a class="link" href="https://forms.gle/ciWCnYnkFjutwEHWA" target="_blank">
        {{ t('MAIN_MENU.WHAT_IS_NEW') }}
      </a>
      <a class="link" href="https://forms.gle/9pv3HCmtPQN8Akpn9" target="_blank">
        {{ t('MAIN_MENU.CONTACT_US') }}
      </a>
    </div>

    <div class="flex w-full items-center justify-between">
      <div class="text-sm">Version {{ version }}</div>
      <div class="text-lg">
        <span v-if="locale === 'fr'">FR</span>
        <a v-if="locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
        /
        <span v-if="locale === 'en'">EN</span>
        <a v-if="locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
      </div>
    </div>
  </div>
</template>
