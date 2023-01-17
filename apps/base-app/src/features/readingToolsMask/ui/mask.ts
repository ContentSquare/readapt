import { BASE_COLOR, BASE_MASK_HEIGHT } from '../config'
import type { SettingsReadingTool } from '@/entities/readingTools'
import { appendNewElementToBody } from '@/shared/lib/dom'

let maskElem: HTMLElement
let maskElemBefore: HTMLElement

export const state = {
  enabled: false,
  height: BASE_MASK_HEIGHT,
  color: `${BASE_COLOR}33`
}

const updateMaskPositionListener = (event: MouseEvent): void => {
  const maskHeight = state.height
  updatePosition(event.clientY, maskHeight)
}

export const add = (): void => {
  maskElemBefore = appendNewElementToBody('mask-before')
  maskElem = appendNewElementToBody('mask')
  document.addEventListener('mousemove', updateMaskPositionListener)

  state.enabled = true
  document.documentElement.style.setProperty('--mask-color', state.color)
}

export const remove = (): void => {
  maskElem?.remove()
  maskElemBefore?.remove()
  document.removeEventListener('mousemove', updateMaskPositionListener)
  state.enabled = false
}

const updatePosition = (clientY: number, maskHeight: number): void => {
  const maskPosition = Math.max(clientY + maskHeight / 2, maskHeight)
  setTimeout(() => {
    maskElemBefore?.style.setProperty('height', `${Math.max(maskPosition - maskHeight, 0)}px`)
    maskElem?.style.setProperty('top', `${maskPosition}px`)
  })
}

export const updateSettings = (clientY: number, maskSettings: SettingsReadingTool): void => {
  if (maskSettings) {
    state.color = BASE_COLOR + maskSettings.opacity
    state.height = BASE_MASK_HEIGHT * parseInt(maskSettings.thickness)
  }

  document.documentElement.style.setProperty('--mask-color', state.color)
  updatePosition(clientY, state.height)
}
