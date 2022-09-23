<script lang="ts">
/* global Office Word */
import { computed, defineComponent, ref } from '@vue/composition-api'
import { BButton, BImg } from 'bootstrap-vue'
import isEqual from 'lodash/isEqual'

import { Settings, Profiles, buildDefaultProfiles } from '@readapt/settings'

import { useVersion } from '@readapt/app-container'

import store from '@/store'
import i18n from '@/i18n'
import { trackAdaptEvent } from '@/services/stats'

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

    const getDocumentSelection = (): Promise<HTMLElement> => {
      return Word.run(async (context: Word.RequestContext) => {
        const rangeSelection = context.document.getSelection()
        await context.sync()
        const htmlSelection = rangeSelection.getHtml()
        await context.sync()
        const domSelection = new DOMParser().parseFromString(htmlSelection.value, 'text/html')
        return domSelection.body
      })
    }

    const convertImages = async (body: HTMLElement, isSelection: boolean): Promise<boolean> => {
      return await Word.run(async (context: Word.RequestContext) => {
        let documentPictures
        if (isSelection) {
          const selection = context.document.getSelection()
          await context.sync()
          documentPictures = selection.inlinePictures.load({ $all: true })
        } else {
          documentPictures = context.document.body.inlinePictures.load({ $all: true })
        }
        await context.sync()
        const htmlImages = Array.from(body.getElementsByTagName('img')) as HTMLImageElement[]
        // When the document has floating images, their are badly positioned.
        // inlinePictures.load() method do not return floating images
        // This workaround remove the images in this case until we find a better solution
        if (documentPictures.items.length !== htmlImages.length) {
          htmlImages.forEach((image) => image.remove())
          return true
        }
        // Move <img> elements outside <p> elements to avoid to be taken account on shade lines height calculation
        const pElements = Array.from(body.getElementsByTagName('p')) as HTMLElement[]
        pElements
          .filter((pElem) => pElem.getElementsByTagName('img').length > 0) //
          .forEach((pElem) => {
            const images = Array.from(pElem.getElementsByTagName('img')) as HTMLElement[]
            images.forEach((image) => {
              pElem.parentElement?.insertBefore(image, pElem)
            })
          })

        if (Office.context.platform === Office.PlatformType.OfficeOnline) {
          return false
        }
        // If the platform is not office online replace image link to base64 encodig image
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

        return false
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

    const openDialogBox = (document: HTMLElement, isSelection = false): void => {
      trackAdaptEvent(isSelection)
      const sendDocument = buildSendDocument(document, isSelection)
      Office.context.ui.displayDialogAsync(
        `${window.location.origin}/#/dialog-box`,
        { height: 90, width: 90 },
        (asyncResult: Office.AsyncResult<Office.Dialog>) => {
          dialogContext.value = asyncResult.value
          dialogContext.value.addEventHandler(Office.EventType.DialogMessageReceived, sendDocument)
          dialogContext.value.addEventHandler(Office.EventType.DialogEventReceived, sendDocument)
        }
      )
    }

    const buildSendDocument = (documentBody: HTMLElement, isSelection: boolean) => async (): Promise<void> => {
      const hasFloatingImages = await convertImages(documentBody, isSelection)
      removeFontStyles(documentBody)
      addListStyles(documentBody)

      const newHTML = new XMLSerializer().serializeToString(documentBody)

      sendDocument(newHTML, settings.value, i18n.locale, hasFloatingImages)
    }

    const sendDocument = (html: string, settings: Settings, lang: string, withFloatingImages: boolean): void => {
      const message = JSON.stringify({ html: html, settings, lang, withFloatingImages })

      const dialogBox = dialogContext.value
      if (Office.context.requirements.isSetSupported('DialogApi', '1.2')) {
        dialogBox?.messageChild(message)
      } else {
        console.warn('dialogApi not supported')
      }
    }

    const adaptDocument = async () => {
      const document = await getDocumentBody()
      openDialogBox(document)
    }
    const adaptSelection = async () => {
      try {
        const selection = await getDocumentSelection()
        openDialogBox(selection, true)
      } catch (error) {
        console.error(error)
      }
    }

    const { version } = useVersion()

    return {
      version,
      isDefaultSettings,
      adaptDocument,
      adaptSelection
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
        <b-button class="w-100" size="md" variant="primary" @click="adaptSelection">
          {{ $t('MAIN_MENU.ADAPT_SELECTION') }}
        </b-button>
      </div>
      <div class="my-2" style="min-width: 250px" v-if="!isDefaultSettings">
        <b-button class="w-100" size="md" variant="primary" @click="adaptDocument">
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
      <div class="footer" style="min-width: 250px">
        <strong class="version">Version {{ version }}</strong>
        <div class="lang">
          <span v-if="$i18n.locale === 'fr'">FR</span><a v-if="$i18n.locale !== 'fr'" href="#" @click="changeLocale('fr')">FR</a>
          /
          <span v-if="$i18n.locale === 'en'">EN</span><a v-if="$i18n.locale !== 'en'" href="#" @click="changeLocale('en')">EN</a>
        </div>
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

<style lang="scss">
.footer {
  display: grid;
  gap: 0.5rem;
  grid-template-areas: 'version lang';
  grid-template-columns: 1fr auto;

  .version {
    grid-area: version;
    justify-self: start;
  }
  .lang {
    grid-area: lang;
  }
}
</style>
