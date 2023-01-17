import type { SettingsReadingTool } from '@/entities/readingTools'
import { BASE_COLOR, BASE_RULE_SIZE } from '../config'
import { appendNewElementToBody } from '@/shared/lib/dom'

let rulerElem: HTMLElement
const rulerState = {
  enabled: false,
  size: BASE_RULE_SIZE,
  color: `${BASE_COLOR}ff`
}

const updateRulerPositionListener = (event: MouseEvent): void => {
  const rulerPosition = `${Math.max(event.clientY - rulerState.size, 0)}px`
  setTimeout(() => {
    rulerElem.style.setProperty('height', rulerPosition)
  }, 0)
}

export const addRuler = (): void => {
  rulerElem = appendNewElementToBody('ruler')

  document.addEventListener('mousemove', updateRulerPositionListener)

  rulerState.enabled = true
  document.documentElement.style.setProperty('--ruler-color', rulerState.color)
  document.documentElement.style.setProperty('--ruler-size', `${rulerState.size}px`)
}

export const removeRuler = (): void => {
  rulerElem?.remove()
  document.removeEventListener('mousemove', updateRulerPositionListener)
  rulerState.enabled = false
}

export const updateRulerSettings = (ruleSettings: SettingsReadingTool): void => {
  if (ruleSettings) {
    rulerState.color = BASE_COLOR + ruleSettings.opacity
    rulerState.size = BASE_RULE_SIZE * parseInt(ruleSettings.thickness)
  }
  document.documentElement.style.setProperty('--ruler-color', rulerState.color)
  document.documentElement.style.setProperty('--ruler-size', `${rulerState.size}px`)
}
