<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { BButton, BFormCheckbox, BImg } from 'bootstrap-vue'

import { useVersion } from '@readapt/shared-components'
import { TextProfileActiveDropdown } from '@/features/textProfileActiveDropdown'
import { useTextPreferences } from '@/entities/textPreferences'

import utils from '@/chrome'
import { useI18n } from 'vue-i18n-composable'
import { useRouter } from 'vue-router/composables'

import QuickActivate from '@/components/QuickActivate.vue'
import BaseButton from '@/shared/ui/BaseButton.vue'

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
  <div class="mx-auto w-full max-w-screen-sm">
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div>
        <!--<b-button class="mr-2" size="sm" variant="primary" @click="adapt()" :disabled="!readaptEnabled">-->
        <!--  {{ t('MAIN_MENU.ADAPT_PAGE') }}-->
        <!--</b-button>-->
        <b-button v-if="hasActiveProfile" size="sm" variant="outline-primary" @click="reset()" :disabled="!readaptEnabled">
          {{ t('MAIN_MENU.RESET') }}
        </b-button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="mr-3" style="font-size: 14px">
          <span class="mr-2"> {{ t('MAIN_MENU.MENU_LANGUAGE') }}</span>
          <span v-if="locale === 'fr'">FR</span>
          <a v-if="locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
          /
          <span v-if="locale === 'en'">EN</span>
          <a v-if="locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
        </div>
        <b-img class="logo" src="/logo.png" alt="readapt-logo" />
      </div>
    </div>

    <div class="d-flex justify-content-start align-items-center mt-2" v-if="hasActiveProfile">
      <label class="form-check-label mr-2">{{ t('MAIN_MENU.READAPT_ACTIVE') }}</label>
      <b-form-checkbox switch :checked="readaptEnabled" @change="switchEnabled" />
    </div>

    <div class="mt-3" v-if="hasActiveProfile">
      <h5>{{ t('MAIN_MENU.ADAPT_TEXT_BY') }}</h5>
      <ul class="help">
        <!-- <li>-->
        <!--   <b-icon-hand-index-thumb />-->
        <!--   {{ t('MAIN_MENU.CLICKING_ADAPT_PAGE_BUTTON') }}-->
        <!-- </li>-->
        <!-- <li>{{ t('MAIN_MENU.RIGHT_CLICK_AND_SELECT_ADAPT') }}</li>-->
        <li>{{ t('MAIN_MENU.HOLD_CMD_AND_CLICK_TARGET') }}</li>
      </ul>
    </div>
    <div v-else class="my-3 text-center">{{ t('MAIN_MENU.FIRST_RUN') }}</div>

    <div class="mt-3 mb-4 flex items-center" :class="hasActiveProfile ? 'justify-between' : 'justify-center'">
      <div v-if="hasActiveProfile">
        <h5 class="mb-1">{{ $t('MAIN_MENU.ACTIVE_PROFILE') }}:</h5>
        <TextProfileActiveDropdown class="popup-page__active-profile-dropdown" />
        <span
          :title="$t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE')"
          class="popup-page__edit-profile ml-2"
          @click="openOptionsPage({ editActiveProfile: null }, router)"
        >
          <img class="popup-page__edit-icon" src="/icons/edit.svg" />
        </span>
      </div>

      <BaseButton @click="openOptionsPage({}, router)" class="mx-2 w-1/4">
        {{ t('MAIN_MENU.CREATE_BRAND_NEW_PROFILE') }}
      </BaseButton>

      <BaseButton @click="selectTemplate" class="mx-2 w-1/4">
        {{ t('MAIN_MENU.BASE_YOUR_PROFILE_FROM_TEMPLATE') }}
      </BaseButton>

      <!--            <b-button size="sm" variant="primary" disabled>-->
      <!--              {{ t('MAIN_MENU.I_HAVE_PROFILE_CODE') }}-->
      <!--            </b-button>-->
    </div>

    <QuickActivate class="mb-auto" />

    <div class="footer my-2">
      <strong class="version">Version {{ version }}</strong>

      <a class="about-you" href="https://readapt.ai/#user-guides" target="_blank">
        <b-button size="sm" variant="primary">{{ t('MAIN_MENU.USER_GUIDE') }}</b-button>
      </a>
      <a class="about-you" href="https://forms.gle/ciWCnYnkFjutwEHWA" target="_blank">
        <b-button size="sm" variant="primary">{{ t('MAIN_MENU.WHAT_IS_NEW') }}</b-button>
      </a>
      <a class="contact-us" href="https://forms.gle/9pv3HCmtPQN8Akpn9" target="_blank">
        <b-button size="sm" variant="primary">{{ t('MAIN_MENU.CONTACT_US') }}</b-button>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.popup-page {
  &__buttons {
    gap: 32px;
  }

  &__edit-profile {
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  &__active-profile-dropdown {
    width: 150px;
    font-size: 18px;
  }

  &__edit-icon {
    width: 20px;
    height: 20px;
  }
}

.help {
  font-size: 12px;
}

.logo {
  width: 169px;
}

.list-group {
  max-height: 200px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .version {
    margin-right: auto;
  }
}
</style>
