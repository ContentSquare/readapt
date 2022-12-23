// READING TOOLS
import { SettingsReadingTool } from '../src/interfaces/settingsReadingTool'

const BASE_COLOR = '#000000'
const BASE_RULE_SIZE = 1
const BASE_MASK_HEIGHT = 30

let rulerElem: HTMLElement
const rulerState = {
  enabled: false,
  size: BASE_RULE_SIZE,
  color: `${BASE_COLOR}ff`
}

let maskElem: HTMLElement
let maskElemBefore: HTMLElement
const maskState = {
  enabled: false,
  height: BASE_MASK_HEIGHT,
  color: `${BASE_COLOR}33`
}

const appendNewElementToBody = (id: string): HTMLElement => {
  const divElement = document.createElement('div')
  divElement.id = id
  document.body.appendChild(divElement)
  return divElement
}

// RULER
const updateRulerPositionListener = (event: MouseEvent): void => {
  const rulerPosition = `${Math.max(event.clientY - rulerState.size, 0)}px`
  setTimeout(() => {
    rulerElem.style.setProperty('height', rulerPosition)
  }, 0)
}

const addRuler = (): void => {
  rulerElem = appendNewElementToBody('ruler')

  document.addEventListener('mousemove', updateRulerPositionListener)

  rulerState.enabled = true
  document.documentElement.style.setProperty('--ruler-color', rulerState.color)
  document.documentElement.style.setProperty('--ruler-size', `${rulerState.size}px`)
}

const removeRuler = (): void => {
  rulerElem?.remove()
  document.removeEventListener('mousemove', updateRulerPositionListener)
  rulerState.enabled = false
}

const updateRulerSettings = (ruleSettings: SettingsReadingTool): void => {
  if (ruleSettings) {
    rulerState.color = BASE_COLOR + ruleSettings.opacity
    rulerState.size = BASE_RULE_SIZE * parseInt(ruleSettings.thickness)
  }
  document.documentElement.style.setProperty('--ruler-color', rulerState.color)
  document.documentElement.style.setProperty('--ruler-size', `${rulerState.size}px`)
}
// End ruler

// MASK
const updateMaskPositionListener = (event: MouseEvent): void => {
  const maskHeight = maskState.height
  updateMaskPosition(event.clientY, maskHeight)
}

const addMask = (): void => {
  maskElemBefore = appendNewElementToBody('mask-before')
  maskElem = appendNewElementToBody('mask')
  document.addEventListener('mousemove', updateMaskPositionListener)

  maskState.enabled = true
  document.documentElement.style.setProperty('--mask-color', maskState.color)
}

const removeMask = (): void => {
  maskElem?.remove()
  maskElemBefore?.remove()
  document.removeEventListener('mousemove', updateMaskPositionListener)
  maskState.enabled = false
}

const updateMaskPosition = (clientY: number, maskHeight: number): void => {
  const maskPosition = Math.max(clientY + maskHeight / 2, maskHeight)
  setTimeout(() => {
    maskElemBefore?.style.setProperty('height', `${Math.max(maskPosition - maskHeight, 0)}px`)
    maskElem?.style.setProperty('top', `${maskPosition}px`)
  })
}

const updateMaskSettings = (clientY: number, maskSettings: SettingsReadingTool): void => {
  if (maskSettings) {
    maskState.color = BASE_COLOR + maskSettings.opacity
    maskState.height = BASE_MASK_HEIGHT * parseInt(maskSettings.thickness)
  }

  document.documentElement.style.setProperty('--mask-color', maskState.color)
  updateMaskPosition(clientY, maskState.height)
}
//end mask

export { addRuler, removeRuler, updateRulerSettings, addMask, removeMask, updateMaskSettings, maskState, rulerState }
