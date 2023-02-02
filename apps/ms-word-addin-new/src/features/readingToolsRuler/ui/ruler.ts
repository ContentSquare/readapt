import type { SettingsReadingTool } from '@/entities/readingTools'
import { BASE_COLOR, BASE_RULE_SIZE } from '../config'
import { appendNewElementToBody } from '@/shared/lib/dom'

let rulerElem: HTMLElement
export const state = {
  enabled: false,
  size: BASE_RULE_SIZE,
  color: `${BASE_COLOR}ff`
}

const updateRulerPositionListener = (event: MouseEvent): void => {
  const rulerPosition = `${Math.max(event.clientY - state.size, 0)}px`
  setTimeout(() => {
    rulerElem.style.setProperty('height', rulerPosition)
  }, 0)
}

export const add = (): void => {
  rulerElem = appendNewElementToBody('ruler')

  document.addEventListener('mousemove', updateRulerPositionListener)

  state.enabled = true
  document.documentElement.style.setProperty('--ruler-color', state.color)
  document.documentElement.style.setProperty('--ruler-size', `${state.size}px`)
}

export const remove = (): void => {
  rulerElem?.remove()
  document.removeEventListener('mousemove', updateRulerPositionListener)
  state.enabled = false
}

export const updateSettings = (ruleSettings: SettingsReadingTool): void => {
  if (ruleSettings) {
    state.color = BASE_COLOR + ruleSettings.opacity
    state.size = BASE_RULE_SIZE * parseInt(ruleSettings.thickness)
  }
  document.documentElement.style.setProperty('--ruler-color', state.color)
  document.documentElement.style.setProperty('--ruler-size', `${state.size}px`)
}
