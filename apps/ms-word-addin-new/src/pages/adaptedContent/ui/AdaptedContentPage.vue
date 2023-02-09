<script lang="ts" setup>
/* global Office */
import { computed, onMounted, ref, unref } from 'vue'

import { opacityOptions, thicknessOptions, type Settings, type ThicknessOption, type OpacityOption } from '@readapt/settings'
import { useTextPreferences } from '@/entities/textPreferences'

import { adaptHtmlElementAsyncFn } from '@/shared/lib/textAdaptation'
import AdaptContainer from '@/shared/ui/AdaptContainer.vue'

const error = ref<string>('')
const userPlatform = ref<Office.PlatformType>()

const heightMask = 25
const BASE_COLOR = '#000000'

const { getActiveProfile } = useTextPreferences()
const settings = computed(() => getActiveProfile()?.settings as Settings)

const ruler = ref<HTMLDivElement>()
const mask = ref<HTMLDivElement>()
const maskBeforeReadingZone = ref<HTMLDivElement>()
const maskReadingZone = ref<HTMLDivElement>()
const maskAfterReadingZone = ref<HTMLDivElement>()
const topBarZone = ref<HTMLDivElement>()

const rulerSettings = ref({
  enabled: false,
  thickness: thicknessOptions[0].value,
  opacity: opacityOptions[0].value
})

const maskSettings = ref({
  enabled: false,
  thickness: thicknessOptions[0].value,
  opacity: opacityOptions[0].value
})

const docHtml = ref<string>('')

const hasFloatingImages = ref<boolean>(false)

const onMessage = (event: Office.DialogParentMessageReceivedEventArgs) => {
  try {
    const message = event.message
    const { html, withFloatingImages } = JSON.parse(message)
    docHtml.value = html
    hasFloatingImages.value = withFloatingImages
    console.log('withFloatingImages', withFloatingImages)
  } catch (e) {
    error.value = 'error'
  }
}

const sendReady = (): void => {
  Office.context.ui.messageParent('ready', { targetOrigin: '*' })
}

const onRegister = (asyncResult: Office.AsyncResult<unknown>): void => {
  sendReady()
  if (asyncResult.status !== Office.AsyncResultStatus.Succeeded) {
    error.value = asyncResult.error.message
  }
}

onMounted(() => {
  Office.onReady((info: { platform: Office.PlatformType }) => {
    Office.context.ui.addHandlerAsync(Office.EventType.DialogParentMessageReceived, onMessage, onRegister)
    userPlatform.value = info.platform
  })

  document.addEventListener('mousemove', (event: MouseEvent) => {
    if (mask.value) {
      const heightMax = document.body.scrollHeight
      mask.value.style.height = `${heightMax.toString()}px`
    }

    if (topBarZone.value && event.pageY > topBarZone.value.offsetHeight) {
      if (ruler.value && rulerSettings.value.enabled) {
        ruler.value.style.top = `${event.pageY}px`
      }
      if (maskBeforeReadingZone.value && maskSettings.value.enabled) {
        maskBeforeReadingZone.value.style.height = `${event.pageY - topBarZone.value.offsetHeight - 20}px`
      }
    }
  })
})

const print = () => window.print()

// RULER
const toggleRuler = () => {
  if (maskSettings.value.enabled) maskSettings.value.enabled = false
  rulerSettings.value.enabled = !rulerSettings.value.enabled
  document.body.className = rulerSettings.value.enabled ? 'showruler' : ''
}

const rulerUpdateThickness = (thickness: ThicknessOption) => {
  const rulerElem = unref(ruler) as HTMLDivElement
  rulerSettings.value.thickness = thickness
  rulerElem.style.borderTopWidth = `${thickness}px`
}

const rulerUpdateOpacity = (opacity: OpacityOption) => {
  const ruleElem = unref(ruler) as HTMLDivElement

  ruleElem.style.borderColor = BASE_COLOR + opacity
  rulerSettings.value.opacity = opacity
}

// MASK
const toggleMask = () => {
  if (rulerSettings.value.enabled) rulerSettings.value.enabled = false
  maskSettings.value.enabled = !maskSettings.value.enabled
  document.body.className = maskSettings.value.enabled ? 'showmask' : ''
}

const maskUpdateThickness = (thickness: ThicknessOption) => {
  const maskReadingZoneElem = unref(maskReadingZone) as HTMLDivElement
  maskReadingZoneElem.style.height = `${(heightMask * parseInt(thickness)).toString()}px`
  maskSettings.value.thickness = thickness
}

const maskUpdateOpacity = (opacity: OpacityOption) => {
  const maskBeforeReadingZoneElem = unref(maskBeforeReadingZone) as HTMLElement
  const maskAfterReadingZoneElem = unref(maskAfterReadingZone) as HTMLElement

  maskBeforeReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
  maskAfterReadingZoneElem.style.backgroundColor = BASE_COLOR + opacity
  maskSettings.value.opacity = opacity
}

const isNotMacOS = computed(() => userPlatform.value !== Office.PlatformType.Mac)
</script>

<template>
  <div class="py-2 px-4">
    <div v-if="error">{{ error }}</div>
    <div class="container-fluid">
      <!--  <div id="topbar" ref="topBarZone" class="sticky-top top-bar">
        <b-button v-if="isNotMacOS" size="sm" variant="primary" style="margin-right: 10px" @click="print()">
          {{ $t('DIALOG_BOX.PRINT') }}
        </b-button>
        <b-form-checkbox :checked="maskSettings.enabled" inline switch @change="toggleMask()">
          {{ $t('DIALOG_BOX.MASK') }}
        </b-form-checkbox>
        <b-form-checkbox :checked="rulerSettings.enabled" inline switch @change="toggleRuler()">
          {{ $t('DIALOG_BOX.RULER') }}
        </b-form-checkbox>

        <b-button v-b-toggle.sidebar-1 class="float-right" size="sm">
          <b-icon-list font-scale="1.5" />
        </b-button>

        <template v-if="hasFloatingImages">
          <b-alert show variant="info" dismissible>
            <h5 class="alert-heading">{{ $t('DIALOG_BOX.FLOATING_IMAGES_TITLE') }}</h5>
            <p>{{ $t('DIALOG_BOX.FLOATING_IMAGES_EXPLANATION') }}</p>
            <hr />
            <p class="mb-0">
              {{ $t('DIALOG_BOX.FLOATING_IMAGES_LEARN_MORE') }}
              <a class="alert-link" target="_blank" :href="$t('DIALOG_BOX.FLOATING_IMAGES_SUPPORT_LINK')">{{
                $t('DIALOG_BOX.FLOATING_IMAGES_CLICK_HERE')
              }}</a>
            </p>
          </b-alert>
        </template>
      </div> -->

      <AdaptContainer :adapt-html-element-async="adaptHtmlElementAsyncFn()" :settings="settings" :content-to-adapt="docHtml" />
    </div>
    <div id="ruler-add-in" ref="ruler"></div>
    <div id="mask-add-in" ref="mask">
      <div id="before-reading-zone" ref="maskBeforeReadingZone"></div>
      <div id="mask-reading-zone" ref="maskReadingZone"></div>
      <div id="after-reading-zone" ref="maskAfterReadingZone"></div>
    </div>
  </div>
</template>

<style scoped>
#ruler-add-in {
  position: absolute;
  display: none;
  z-index: 3;
  width: 100%;
  border-top: 1px solid #00000033;
}

.showruler #ruler-add-in {
  display: block;
  cursor: vertical-text;
}

#mask-add-in {
  position: absolute;
  flex-direction: column;
  top: 50px;
  left: 0;
  display: none;
  z-index: 3;
  width: 100%;
}

#before-reading-zone,
#after-reading-zone {
  background: #20202033;
}

#after-reading-zone {
  flex-grow: 2;
}

#mask-reading-zone {
  width: 100%;
  height: 25px;
}

.showmask #mask-add-in {
  display: flex;
  cursor: vertical-text;
}

@media print {
  .btn {
    visibility: hidden !important;
  }

  .top-bar {
    visibility: hidden !important;
  }
}

.top-bar {
  z-index: 4;
  background-color: white;
}
</style>
