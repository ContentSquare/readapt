<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'

import { useVersion } from '@readapt/shared-components'
import { TextProfileActiveDropdown } from '@/features/textProfileActiveDropdown'
import { useTextPreferences } from '@/entities/textPreferences'

import utils from '@/chrome'
import { useI18n } from 'vue-i18n-composable'
import { useRouter } from 'vue-router/composables'

import { ToolsQuickActivate } from '@/features/ToolsQuickActivate'
import SvgIcon from '@/shared/ui/SvgIcon.vue'

const router = useRouter()

const readaptEnabled = ref(true)

const { openOptionsPage, sendMessageToCurrentTab, openTemplates, broadcastMessage, getEnabled, saveEnabled, saveLocale } = utils

const { preferences } = useTextPreferences()
const hasActiveProfile = computed(() => Boolean(preferences.activeProfileId))

watchEffect(async () => (readaptEnabled.value = await getEnabled()))

const switchEnabled = async () => {
  readaptEnabled.value = !readaptEnabled.value
  await saveEnabled(readaptEnabled.value)
  const message = readaptEnabled.value ? 'ENABLE' : 'DISABLE'
  await broadcastMessage(message)
}

const adapt = async () => await sendMessageToCurrentTab('ADAPT')
const reset = async () => await sendMessageToCurrentTab('RESET')
const selectTemplate = async () => await openTemplates(router)

const { locale, t } = useI18n()

const changeLocale = async (lang: 'en' | 'fr') => {
  locale.value = lang
  await saveLocale(lang)
}

const { version } = useVersion()
</script>

<template>
  <div class="mx-auto w-full max-w-screen-sm p-2">
    <div class="flex items-center">
      <div class="w-1/3">
        <button class="btn-outline btn-secondary btn-sm btn" v-if="hasActiveProfile" @click="reset()" :disabled="!readaptEnabled">
          {{ t('MAIN_MENU.RESET') }}
        </button>
      </div>
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

    <label class="mt-2 flex w-48 cursor-pointer items-center justify-start">
      <span class="mr-2">{{ t('MAIN_MENU.READAPT_ACTIVE') }}</span>
      <input type="checkbox" class="toggle-primary toggle toggle-sm" :checked="readaptEnabled" @change="switchEnabled" />
    </label>

    <div class="mt-3" v-if="hasActiveProfile">
      <div class="text-lg font-semibold">{{ t('MAIN_MENU.ADAPT_TEXT_BY') }}</div>
      <ul class="ml-4 mt-1 list-disc text-sm">
        <li>{{ t('MAIN_MENU.HOLD_CMD_AND_CLICK_TARGET') }}</li>
      </ul>
    </div>
    <div v-else class="my-3 text-center">{{ t('MAIN_MENU.FIRST_RUN') }}</div>

    <div class="mt-6 flex grow items-center gap-10" :class="hasActiveProfile ? 'justify-between' : 'justify-center'">
      <div v-if="hasActiveProfile" class="w-[220px]">
        <div class="text-lg font-semibold">{{ $t('MAIN_MENU.ACTIVE_PROFILE') }}:</div>
        <div class="flex justify-between">
          <TextProfileActiveDropdown class="select-primary select select-sm w-40" />
          <button
            :title="$t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE')"
            class="btn-outline btn-primary btn-sm btn ml-1"
            @click="openOptionsPage({ editActiveProfile: null }, router)"
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

    <ToolsQuickActivate class="mb-auto mt-6" />

    <div class="mt-2 flex items-center">
      <div class="mr-auto text-sm">Version {{ version }}</div>
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
