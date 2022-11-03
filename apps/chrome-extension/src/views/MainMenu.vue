<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { BButton, BFormCheckbox, BImg } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { buildDefaultProfiles, Profiles } from '@readapt/settings'
import { useVersion } from '@readapt/shared-components'

import utils from '@/chrome'
import i18n from '@/i18n'
import store from '@/store'

import QuickActivate from '@/components/QuickActivate.vue'

const MainMenu = defineComponent({
  components: {
    // BoostrapVue Icons
    // BIconHandIndexThumb,
    // BoostrapVue Components
    BButton,
    BFormCheckbox,
    BImg,
    // Custom Components
    QuickActivate
  },
  setup() {
    const readaptEnabled = ref(true)

    const {
      openSettings,
      sendMessageToCurrentTab,
      newSettings,
      openTemplates,
      broadcastMessage,
      getEnabled,
      saveEnabled,
      saveLocale,
      openSettingsCode
    } = utils

    const settings = computed(() => store.getters.getSettings)
    const defaultProfiles = buildDefaultProfiles()

    const isDefaultSettings = computed(() => {
      const lang = settings.value.language as keyof Profiles
      const defaultSettings = defaultProfiles[lang]
      return isEqual(settings.value, defaultSettings)
    })

    watchEffect(async () => (readaptEnabled.value = await getEnabled()))

    const switchEnabled = async () => {
      readaptEnabled.value = !readaptEnabled.value
      await saveEnabled(readaptEnabled.value)
      const message = readaptEnabled.value ? 'ENABLE' : 'DISABLE'
      await broadcastMessage(message)
    }

    const adapt = async () => await sendMessageToCurrentTab('ADAPT')
    const reset = async () => await sendMessageToCurrentTab('RESET')
    const selectTemplate = async () => await openTemplates()

    const changeLocale = async (lang: 'en' | 'fr') => {
      i18n.locale = lang
      await saveLocale(lang)
    }

    const { version } = useVersion()

    return {
      version,
      readaptEnabled,
      // methods,
      openSettings,
      newSettings,
      sendMessageToCurrentTab,
      broadcastMessage,
      openTemplates,
      switchEnabled,
      adapt,
      reset,
      selectTemplate,
      openSettingsCode,
      changeLocale,
      isDefaultSettings
    }
  }
})
export default MainMenu
</script>

<template>
  <div class="container-fluid d-flex flex-column justify-content-between" style="min-width: 600px; min-height: 600px; max-width: 600px">
    <div class="mt-2 d-flex justify-content-between align-items-center">
      <div>
        <!--<b-button class="mr-2" size="sm" variant="primary" @click="adapt()" :disabled="!readaptEnabled">-->
        <!--  {{ $t('MAIN_MENU.ADAPT_PAGE') }}-->
        <!--</b-button>-->
        <b-button v-if="!isDefaultSettings" size="sm" variant="outline-primary" @click="reset()" :disabled="!readaptEnabled">
          {{ $t('MAIN_MENU.RESET') }}
        </b-button>
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="mr-3" style="font-size: 14px">
          <span class="mr-2"> {{ $t('MAIN_MENU.MENU_LANGUAGE') }}</span>
          <span v-if="$i18n.locale === 'fr'">FR</span>
          <a v-if="$i18n.locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
          /
          <span v-if="$i18n.locale === 'en'">EN</span>
          <a v-if="$i18n.locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
        </div>
        <b-img class="logo" :src="require('../assets/logo.png')" alt="readapt-logo" />
      </div>
    </div>

    <div class="d-flex justify-content-start align-items-center mt-2" v-if="!isDefaultSettings">
      <label class="form-check-label mr-2">{{ $t('MAIN_MENU.READAPT_ACTIVE') }}</label>
      <b-form-checkbox switch :checked="readaptEnabled" @change="switchEnabled" />
    </div>

    <div class="mt-3" v-if="!isDefaultSettings">
      <h5>{{ $t('MAIN_MENU.ADAPT_TEXT_BY') }}</h5>
      <ul class="help mb-0">
        <!-- <li>-->
        <!--   <b-icon-hand-index-thumb />-->
        <!--   {{ $t('MAIN_MENU.CLICKING_ADAPT_PAGE_BUTTON') }}-->
        <!-- </li>-->
        <!-- <li>{{ $t('MAIN_MENU.RIGHT_CLICK_AND_SELECT_ADAPT') }}</li>-->
        <li>{{ $t('MAIN_MENU.HOLD_CMD_AND_CLICK_TARGET') }}</li>
      </ul>
    </div>
    <div v-else class="text-center my-3">{{ $t('MAIN_MENU.FIRST_RUN') }}</div>

    <div class="my-3 d-flex align-items-center" :class="isDefaultSettings ? 'justify-content-center' : 'justify-content-between'">
      <b-button v-if="!isDefaultSettings" size="sm" variant="primary" @click="openSettings" style="max-width: 120px">
        {{ $t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE') }}
      </b-button>

      <b-button size="sm" variant="primary" :class="{ 'mr-3': isDefaultSettings }" @click="newSettings" style="max-width: 120px">
        {{ $t('MAIN_MENU.CREATE_BRAND_NEW_PROFILE') }}
      </b-button>

      <b-button size="sm" variant="primary" :class="{ 'mr-3': isDefaultSettings }" @click="openSettingsCode" style="max-width: 120px">
        {{ $t('MAIN_MENU.I_HAVE_PROFILE_CODE') }}
      </b-button>

      <b-button size="sm" variant="primary" @click="selectTemplate" style="max-width: 150px">
        {{ $t('MAIN_MENU.BASE_YOUR_PROFILE_FROM_TEMPLATE') }}
      </b-button>
    </div>

    <QuickActivate class="mb-auto" />

    <div class="footer my-2">
      <strong class="version">Version {{ version }}</strong>

      <a class="about-you" href="https://forms.gle/ciWCnYnkFjutwEHWA" target="_blank">
        <b-button size="sm" variant="primary">{{ $t('MAIN_MENU.TELL_US_ABOUT_YOU') }}</b-button>
      </a>
      <a class="contact-us" href="https://forms.gle/9pv3HCmtPQN8Akpn9" target="_blank">
        <b-button size="sm" variant="primary">{{ $t('MAIN_MENU.CONTACT_US') }}</b-button>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
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
  display: grid;
  gap: 0.5rem;
  grid-template-areas: 'version about-you contact-us';
  grid-template-columns: 1fr auto auto;

  .version {
    grid-area: version;
    justify-self: start;
  }
  .about-you {
    grid-area: about-you;
  }
  .contact-us {
    grid-area: contact-us;
  }
}
</style>
