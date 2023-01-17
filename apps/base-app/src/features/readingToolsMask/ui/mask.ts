import { BASE_COLOR, BASE_MASK_HEIGHT } from '../config'
import type { SettingsReadingTool } from '@/entities/readingTools'
import { appendNewElementToBody } from '@/shared/lib/dom'

let maskElem: HTMLElement
let maskElemBefore: HTMLElement

const maskState = {
  enabled: false,
  height: BASE_MASK_HEIGHT,
  color: `${BASE_COLOR}33`
}

const updateMaskPositionListener = (event: MouseEvent): void => {
  const maskHeight = maskState.height
  updateMaskPosition(event.clientY, maskHeight)
}

export const addMask = (): void => {
  maskElemBefore = appendNewElementToBody('mask-before')
  maskElem = appendNewElementToBody('mask')
  document.addEventListener('mousemove', updateMaskPositionListener)

  maskState.enabled = true
  document.documentElement.style.setProperty('--mask-color', maskState.color)
}

export const removeMask = (): void => {
  maskElem?.remove()
  maskElemBefore?.remove()
  document.removeEventListener('mousemove', updateMaskPositionListener)
  maskState.enabled = false
}

export const updateMaskPosition = (clientY: number, maskHeight: number): void => {
  const maskPosition = Math.max(clientY + maskHeight / 2, maskHeight)
  setTimeout(() => {
    maskElemBefore?.style.setProperty('height', `${Math.max(maskPosition - maskHeight, 0)}px`)
    maskElem?.style.setProperty('top', `${maskPosition}px`)
  })
}

export const updateMaskSettings = (clientY: number, maskSettings: SettingsReadingTool): void => {
  if (maskSettings) {
    maskState.color = BASE_COLOR + maskSettings.opacity
    maskState.height = BASE_MASK_HEIGHT * parseInt(maskSettings.thickness)
  }

  document.documentElement.style.setProperty('--mask-color', maskState.color)
  updateMaskPosition(clientY, maskState.height)
}
