<script lang="ts">
/* global Office Word OfficeExtension */
import { computed, defineComponent, ref } from '@vue/composition-api'
import isEqual from 'lodash/isEqual'
import store from '@/store'
import { BButton, BImg } from 'bootstrap-vue'
import i18n from '@/i18n'
import { buildDefaultProfiles } from '@/constants/defaultProfiles'
import { Profiles } from '@/interfaces'
import { trackAdaptEvent } from '@/services/stats'

export interface OfficeCustomImageData {
  htmlImage: HTMLImageElement
  base64Image: OfficeExtension.ClientResult<string>
}

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

    const sendMessage = (message: string) => {
      const dialogBox = dialogContext.value
      if (Office.context.requirements.isSetSupported('DialogApi', '1.2')) {
        dialogBox?.messageChild(message)
      } else {
        console.warn('dialogApi not supported')
      }
    }

    const sendDocument = (bodyHTML: string) => {
      let lang = i18n.locale
      sendMessage(JSON.stringify({ html: bodyHTML, settings: settings.value, lang }))
    }

    const imageFormat = () => {
      return Word.run(async (context) => {
        var htmlDocumentBody = context.document.body.getHtml()
        await context.sync()
        if (Office.context.platform === Office.PlatformType.OfficeOnline) {
          let documentDom = new DOMParser().parseFromString(htmlDocumentBody.value, 'text/html')
          return documentDom.body
        }
        let myImages = context.document.body.inlinePictures.load({ $all: true })
        return context.sync().then(async () => {
          let documentDom = new DOMParser().parseFromString(htmlDocumentBody.value, 'text/html')
          let htmlImages = documentDom.getElementsByTagName('img')
          const values: OfficeCustomImageData[] = []
          for (let i = 0; i < myImages.items.length; i++) {
            const base64 = myImages.items[i].getBase64ImageSrc()
            await context.sync()
            values.push({
              base64Image: base64,
              htmlImage: htmlImages[i]
            })
          }
          for (let i = 0; i < myImages.items.length; i++) {
            // Format PNG
            if (values[i].base64Image.value.startsWith('iVBORw')) {
              htmlImages[i].src = 'data:image/png;base64,' + values[i].base64Image.value
            }
            // Format Jpeg
            else if (values[i].base64Image.value.startsWith('/9j/4AAQSkZJRg')) {
              htmlImages[i].src = 'data:image/jpeg;base64,' + values[i].base64Image.value
            }
            // Format GIF
            else if (values[i].base64Image.value.startsWith('R0lGO')) {
              htmlImages[i].src = 'data:image/gif;base64,' + values[i].base64Image.value
            }
            // Format SVG
            else if (values[i].base64Image.value.startsWith('PHN2Zy')) {
              htmlImages[i].src = 'data:image/svg+xml;base64,' + values[i].base64Image.value
            }
          }
          return documentDom.body
        })
      })
    }

    const listFormat = (body: HTMLElement) => {
      let listMarker = Array.from(body.getElementsByClassName('ListMarkerWrappingSpan')) as HTMLElement[]

      //Format des listMarker
      for (let index = 0; index < listMarker.length; index++) {
        var sibling = listMarker[index].nextElementSibling as HTMLElement

        if (listMarker[index].innerText === '·') {
          listMarker[index].style.fontFamily = 'Symbol, Symbol_MSFontService, sans-serif'
        } else {
          listMarker[index].style.fontFamily = sibling.style.fontFamily
        }

        listMarker[index].innerText = listMarker[index].innerText + '\t'
        listMarker[index].style.fontSize = sibling.style.fontSize
        listMarker[index].style.color = sibling.style.color
        listMarker[index].style.lineHeight = sibling.style.lineHeight
      }
      return body
    }

    const fontFormat = (body: HTMLElement) => {
      let elements = Array.from(body.getElementsByTagName('*')) as HTMLElement[]

      for (let index = 0; index < elements.length; index++) {
        elements[index].style.fontFamily = ''
        elements[index].style.fontSize = ''

        // Décallage des listes
        elements[index].style.textIndent = '0'
      }
      return body
    }

    const onMessage = () => {
      let document = imageFormat()
      document.then((doc) => {
        // Suppression des FontSize et FontFamily
        let htmlFormated = fontFormat(doc as HTMLElement)

        // Modification de HTML List
        htmlFormated = listFormat(doc as HTMLElement)

        //XML Seralizer
        const newHTML = new XMLSerializer().serializeToString(htmlFormated)
        sendDocument(newHTML)
      })
    }

    const openDialogBox = () => {
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

    return {
      dialogContext,
      // methods
      sendMessage,
      openDialogBox,
      isDefaultSettings
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
