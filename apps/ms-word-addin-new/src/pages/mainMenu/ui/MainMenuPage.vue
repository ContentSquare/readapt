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
  <div class="mx-auto w-full max-w-screen-sm py-2 px-3 text-base">
    <div class="flex items-center">
      <div class="w-1/3 text-center">
        {{ t('MAIN_MENU.MENU_LANGUAGE') }}
        <span v-if="locale === 'fr'">FR</span>
        <a v-if="locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
        /
        <span v-if="locale === 'en'">EN</span>
        <a v-if="locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
      </div>
      <div class="w-1/3">
        <img class="float-right w-[169px]" src="/logo.png" alt="Readapt Logo" />
      </div>
    </div>

    <div class="mt-5 flex grow items-center gap-9" :class="hasActiveProfile ? 'justify-between' : 'justify-center'">
      <div v-if="hasActiveProfile" class="w-[220px]">
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
      <button class="btn-primary btn w-[150px]" @click="openOptionsPage({}, router)">
        {{ t('MAIN_MENU.CREATE_BRAND_NEW_PROFILE') }}
      </button>
      <button class="btn-primary btn float-right w-[150px]" @click="selectTemplate">
        {{ t('MAIN_MENU.BASE_YOUR_PROFILE_FROM_TEMPLATE') }}
      </button>
    </div>

    <div class="mt-2 flex items-center text-sm">
      <div class="mr-auto">Version {{ version }}</div>
      <a class="link mr-3" href="https://readapt.ai/#user-guides" target="_blank">
        {{ t('MAIN_MENU.USER_GUIDE') }}
      </a>
      <a class="link mr-3" href="https://forms.gle/ciWCnYnkFjutwEHWA" target="_blank">
        {{ t('MAIN_MENU.WHAT_IS_NEW') }}
      </a>
      <a class="link" href="https://forms.gle/9pv3HCmtPQN8Akpn9" target="_blank">
        {{ t('MAIN_MENU.CONTACT_US') }}
      </a>
    </div>
  </div>
</template>
