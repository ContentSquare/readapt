<script lang="ts">
/* global Office Word */
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BButton, BImg } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import store from '@/store'
import i18n from '@/i18n'
import { buildDefaultProfiles } from '@/constants/defaultProfiles'
import { Profiles } from '@/interfaces'
import { trackAdaptEvent } from '@/services/stats'
import { Settings } from '@readapt/settings'

const MainMenu = defineComponent({
  components: {
    BButton,
    BImg
  },
  setup() {
    const dialogContext = ref<Office.Dialog>()
    const settings = computed(() => store.getters.getSettings)

    const defaultProfiles = buildDefaultProfiles()

    const isDefaultSettings = computed(() => {
      const lang = settings.value.language as keyof Profiles
      const defaultSettings = defaultProfiles[lang]
      return isEqual(settings.value, defaultSettings)
    })

    const getDocumentBody = (): Promise<HTMLElement> => {
      return Word.run(async (context: Word.RequestContext) => {
        const htmlDocument = context.document.body.getHtml()
        await context.sync()
        const domDocument = new DOMParser().parseFromString(htmlDocument.value, 'text/html')
        return domDocument.body
      })
    }

    const convertImages = async (body: HTMLElement): Promise<void> => {
      if (Office.context.platform === Office.PlatformType.OfficeOnline) {
        return // nothing to do
      }

      await Word.run(async (context: Word.RequestContext) => {
        const documentPictures = context.document.body.inlinePictures.load({ $all: true })
        await context.sync()
        const htmlImages = Array.from(body.getElementsByTagName('img')) as HTMLImageElement[]
        if (documentPictures.items.length !== htmlImages.length) {
          htmlImages.forEach((image) => {
            image.src = `assets/no-image.png`
            image.width = 64
            image.height = 58
          })
          return
        }
        for (let i = 0; i < documentPictures.items.length; i++) {
          const base64 = documentPictures.items[i].getBase64ImageSrc()
          await context.sync()
          const base64Image = base64.value
          let mimeType = ''
          if (base64Image.startsWith('iVBORw')) {
            mimeType = 'image/png'
          } else if (base64Image.startsWith('/9j/4AAQSkZJRg')) {
            mimeType = 'image/jpeg'
          } else if (base64Image.startsWith('R0lGO')) {
            mimeType = 'image/gif'
          } else if (base64Image.startsWith('PHN2Zy')) {
            mimeType = 'image/svg+xml'
          }
          if (mimeType) {
            htmlImages[i].src = `data:${mimeType};base64,${base64Image}`
          }
        }
      })
    }

    const addListStyles = (body: HTMLElement): void => {
      let listMarker = Array.from(body.getElementsByClassName('ListMarkerWrappingSpan')) as HTMLElement[]

      listMarker.forEach((item) => {
        const sibling = item.nextElementSibling as HTMLElement

        if (item.innerText === '·') {
          item.style.fontFamily = 'Symbol, Symbol_MSFontService, sans-serif'
        } else {
          item.style.fontFamily = sibling.style.fontFamily
        }

        item.innerText = item.innerText + '\t'
        item.style.fontSize = sibling.style.fontSize
        item.style.color = sibling.style.color
        item.style.lineHeight = sibling.style.lineHeight
      })
    }

    const removeFontStyles = (body: HTMLElement): void => {
      let elements = Array.from(body.getElementsByTagName('*')) as HTMLElement[]

      elements.forEach((item) => {
        item.style.fontFamily = ''
        item.style.fontSize = ''

        // Décallage des listes
        item.style.textIndent = '0'
      })
    }

    const openDialogBox = (): void => {
      trackAdaptEvent()
      Office.context.ui.displayDialogAsync(
        `${window.location.origin}/#/dialog-box`,
        { height: 90, width: 90 },
        (asyncResult: Office.AsyncResult<Office.Dialog>) => {
          dialogContext.value = asyncResult.value
          dialogContext.value.addEventHandler(Office.EventType.DialogMessageReceived, onMessage)
          dialogContext.value.addEventHandler(Office.EventType.DialogEventReceived, onMessage)
        }
      )
    }

    const onMessage = async (): Promise<void> => {
      const body = await getDocumentBody()
      await convertImages(body)
      removeFontStyles(body)
      addListStyles(body)

      const newHTML = new XMLSerializer().serializeToString(body)

      sendDocument(newHTML, settings.value, i18n.locale)
    }

    const sendDocument = (html: string, settings: Settings, lang: string): void => {
      const message = JSON.stringify({ html: html, settings, lang })

      const dialogBox = dialogContext.value
      if (Office.context.requirements.isSetSupported('DialogApi', '1.2')) {
        dialogBox?.messageChild(message)
      } else {
        console.warn('dialogApi not supported')
      }
    }

    return {
      isDefaultSettings,
      openDialogBox
    }
  },
  methods: {
    changeLocale(lang: 'en' | 'fr') {
      this.$i18n.locale = lang
    }
  }
})
export default MainMenu
</script>

<template>
  <div class="container-fluid">
    <div class="d-flex flex-column align-items-center" style="max-width: 250px; margin: 0 auto">
      <div class="my-4" style="min-width: 250px">
        <div class="w-100" style="font-family: Arial, sans-serif">
          <span style="font-size: 37px">Readapt</span> <span style="font-size: 17px">by</span>
        </div>
        <div class="w-100">
          <b-img class="w-100" :src="require('../assets/logo.png')" alt="readapt-logo" />
        </div>
      </div>
      <div class="my-2" style="min-width: 250px" v-if="!isDefaultSettings">
        <b-button class="w-100" size="md" variant="primary" @click="openDialogBox">
          {{ $t('MAIN_MENU.ADAPT_DOC') }}
        </b-button>
      </div>
      <div class="my-2" style="min-width: 250px">
        <router-link to="/settings">
          <b-button class="w-100" size="md" variant="primary">
            {{ isDefaultSettings ? $t('MAIN_MENU.CREATE_A_PROFILE') : $t('MAIN_MENU.SEE_MODIFY_CURRENT_PROFILE') }}
          </b-button>
        </router-link>
      </div>
      <div v-if="!isDefaultSettings" class="my-2" style="min-width: 250px">
        <a href="https://forms.gle/tXTeYXhxevafZPF69" target="_blank">
          <b-button size="sm" variant="primary" class="w-100">{{ $t('MAIN_MENU.TELL_US_ABOUT_YOU') }}</b-button>
        </a>
      </div>
      <div v-if="!isDefaultSettings" class="my-2" style="min-width: 250px">
        <a href="https://forms.gle/cZWVQmhpwuCfbBh39" target="_blank">
          <b-button size="sm" variant="primary" class="w-100">{{ $t('MAIN_MENU.CONTACT_US') }}</b-button>
        </a>
      </div>
      <div class="my-2 text-right" style="min-width: 250px">
        <span v-if="$i18n.locale === 'fr'">FR</span>
        <a v-if="$i18n.locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
        /
        <span v-if="$i18n.locale === 'en'">EN</span>
        <a v-if="$i18n.locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
      </div>
      <div v-if="isDefaultSettings">
        <p>{{ $t('MAIN_MENU.WELCOME_1') }}</p>
        <p>{{ $t('MAIN_MENU.WELCOME_2') }}</p>
        <p>{{ $t('MAIN_MENU.WELCOME_3') }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn {
  font-size: 16px !important;
  font-weight: lighter !important;
  padding: 0.45rem 0.74rem !important;
}
</style>
