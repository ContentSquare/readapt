import { ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { trackAdaptEvent } from '../api/stats'
import type { TextSettings as Settings } from '@/entities/textPreferences'

export const openDialogBox = (settings: Ref<Settings>) => {
  const dialog = ref<Office.Dialog>()
  const { locale } = useI18n()

  return (document: HTMLElement, isSelection = false) => {
    trackAdaptEvent(isSelection)
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/#/dialog-box`,
      { height: 90, width: 90 },
      (asyncResult: Office.AsyncResult<Office.Dialog>) => {
        dialog.value = asyncResult.value
        const handler = () => adaptDocument(document, isSelection)
        dialog.value.addEventHandler(Office.EventType.DialogMessageReceived, handler)
        dialog.value.addEventHandler(Office.EventType.DialogEventReceived, handler)
      }
    )

    async function adaptDocument(documentBody: HTMLElement, isSelection: boolean) {
      const hasFloatingImages = await convertImages(documentBody, isSelection)
      removeFontStyles(documentBody)
      addListStyles(documentBody)

      const newHTML = new XMLSerializer().serializeToString(documentBody)

      sendDocument(newHTML, hasFloatingImages)
    }

    const sendDocument = (html: string, withFloatingImages: boolean): void => {
      const message = JSON.stringify({
        html: html,
        settings: settings.value,
        lang: locale.value,
        withFloatingImages
      })

      if (Office.context.requirements.isSetSupported('DialogApi', '1.2')) {
        dialog.value?.messageChild(message)
      } else {
        console.warn('dialogApi not supported')
      }
    }
  }
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
  const listMarker = Array.from(body.getElementsByClassName('ListMarkerWrappingSpan')) as HTMLElement[]

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
  const elements = Array.from(body.getElementsByTagName('*')) as HTMLElement[]

  elements.forEach((item) => {
    item.style.fontFamily = ''
    item.style.fontSize = ''

    // Décallage des listes
    item.style.textIndent = '0'
  })
}
