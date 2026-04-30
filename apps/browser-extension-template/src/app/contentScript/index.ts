import browser from 'webextension-polyfill'
import { ReadingToolsMask } from '@/features/readingToolsMask'
import { ReadingToolsRuler } from '@/features/readingToolsRuler'

import { loadVisualEngine } from './loadVisualEngine'
import { TEXT_PREFERENCES_STORAGE_KEY } from '@/entities/textPreferences'

const mousePos = {
  x: 0,
  y: 0
}

const originalElementsMap = new Map()

const cacheBody = () => {
  // cache original body if not saved
  if (!originalElementsMap.get('body')) {
    originalElementsMap.set('body', document.body.innerHTML)
  }
}

const getExtensionEnabled = async (): Promise<boolean> => {
  const { enabled } = await browser.storage.sync.get('enabled')
  return enabled ?? true // enabled by default
}

document.addEventListener('mousemove', (event) => {
  mousePos.x = event.clientX
  mousePos.y = event.clientY
})

browser.runtime.onMessage.addListener(async (message) => {
  if (message === 'ADAPT') {
    const enabled = await getExtensionEnabled()
    if (!enabled) {
      return
    }

    cacheBody()
    document.body.innerHTML = originalElementsMap.get('body')
    await adaptHtmlElement(document.body)

    // reading tools
    if (ReadingToolsMask.state.enabled) {
      ReadingToolsMask.add()
    }
    if (ReadingToolsRuler.state.enabled) {
      ReadingToolsMask.add()
    }
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === 'DISABLE') {
    const elements = Array.from(document.getElementsByClassName('readapt-extension'))
    elements.forEach((element) => {
      element.classList.replace('readapt-extension', 'readapt-disabled')
    })

    disableAdaptSelection()
    ReadingToolsMask.remove()
    ReadingToolsRuler.remove()
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === 'ENABLE') {
    const elements = Array.from(document.getElementsByClassName('readapt-disabled'))
    elements.forEach((element) => {
      element.classList.replace('readapt-disabled', 'readapt-extension')
    })

    enableReadapt().catch(console.error)
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === 'RESET') {
    document.body.classList.remove('readapt-extension')

    const originalBody = originalElementsMap.get('body')
    if (originalBody) {
      document.body.innerHTML = originalBody
    }

    const styleElement = document.head.querySelector(`[data-readapt-style=extension]`)
    if (styleElement) {
      styleElement.remove()
    }
  }
})

browser.runtime.onMessage.addListener(async (message) => {
  if (message === 'REFRESH') {
    const enabled = await getExtensionEnabled()
    if (!enabled) {
      return
    }

    // refresh current adaptation
    const adaptedElements: HTMLElement[] = Array.from(document.body.querySelectorAll('[data-readapt-id]'))
    for (const element of adaptedElements) {
      // if has already adapted then revert before adapt
      const oldElemId = element.getAttribute('data-readapt-id') as string
      element.innerHTML = originalElementsMap.get(oldElemId)
      originalElementsMap.delete(oldElemId)
      const originalHTML = element.innerHTML

      await adaptHtmlElement(element)

      const elemId = element.getAttribute('data-readapt-id')
      originalElementsMap.set(elemId, originalHTML)
    }
  }
})

const requestSettings = async () => {
  try {
    const { [TEXT_PREFERENCES_STORAGE_KEY]: preferences } = (await browser.storage.local.get(TEXT_PREFERENCES_STORAGE_KEY)) as any
    if (preferences && preferences.profiles.length > 0) {
      const profile = preferences.profiles.find((profile: any) => profile.id === preferences.activeProfileId)
      const result = profile?.settings
      return result
    }
  } catch (error) {
    console.error('Something went wrong when getting settings')
    console.error(error)
  }
}

const listenKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Control' || event.key === 'Meta') {
    activateHighlightElement()
  } else if (event.composed && (event.ctrlKey || event.metaKey)) {
    // deactivate because is not a selection activation but a key composition (ex. Ctrl + F)
    deactivateHighlightElement()
  }
  if (event.key === 'ESC' || event.key === 'Escape') {
    deactivateHighlightElement()
  }
}

const listenKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Control' || event.key === 'Meta') {
    deactivateHighlightElement()
  }
}

const enableAdaptSelection = () => {
  document.addEventListener('keydown', listenKeyDown)
  document.addEventListener('keyup', listenKeyUp)
}

const disableAdaptSelection = () => {
  document.removeEventListener('keydown', listenKeyDown)
  document.removeEventListener('keyup', listenKeyUp)
}

const adaptElementEvent = async (event: Event) => {
  const element = event.target as HTMLElement
  element.classList.remove('readapt-highlight')

  cacheBody()
  document.body.classList.add('readapt-extension')

  // revert child elems
  const childElemsAdapted = element.querySelectorAll('[data-readapt-id]')
  childElemsAdapted.forEach((childElem) => {
    const childId = childElem.getAttribute('data-readapt-id')
    childElem.innerHTML = originalElementsMap.get(childId)
    childElem.removeAttribute('data-readapt-id')
    originalElementsMap.delete(childId)
  })

  // if is adapted by their parent do nothing
  if (element.getElementsByClassName('readapt-content').length > 0 && !element.hasAttribute('data-readapt-id')) {
    return
  }

  // if has already adapted then revert before adapt
  if (element.hasAttribute('data-readapt-id')) {
    const elemId = element.getAttribute('data-readapt-id')
    element.innerHTML = originalElementsMap.get(elemId)
  }

  const originalHTML = element.innerHTML

  await adaptHtmlElement(element)

  const elemId = element.getAttribute('data-readapt-id')
  originalElementsMap.set(elemId, originalHTML)
}

const adaptHtmlElement = async (element: HTMLElement): Promise<void> => {
  document.body.classList.add('readapt-loading')
  try {
    const settings = await requestSettings()
    if (settings) {
      const visualEngine = await loadVisualEngine()
      visualEngine.adaptHtmlElement(element, settings, 'extension')
    }
  } catch (error) {
    console.error('Something went wrong when adapting element')
    console.error(error)
  }

  browser.storage.local.set({ event: `adapt:${new Date().toISOString()}` }).catch(console.error)

  requestAnimationFrame(() => {
    document.body.classList.remove('readapt-loading')
  })
}

const highlightElement = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target) {
    return
  }

  // prevent the child elements to be adapted twice
  const classList = Array.from(target.classList)
  if (classList.some((item) => item.includes('readapt'))) {
    return
  }

  target.classList.add('readapt-highlight')
  target.addEventListener('mouseout', removeReadaptHighlightClass(target), { once: true })
  target.addEventListener('click', adaptElementEvent, { once: true })
}

const removeReadaptHighlightClass = (target: Element) => () => {
  target.classList.remove('readapt-highlight')
  if (target.classList.length === 0) {
    target.removeAttribute('class')
  }
  target.removeEventListener('click', adaptElementEvent)
}

const activateHighlightElement = () => {
  document.addEventListener('mouseover', highlightElement)
  const target = document.elementFromPoint(mousePos.x, mousePos.y)
  if (target) {
    const event = { target } as Partial<MouseEvent>
    highlightElement(event as MouseEvent)
  }
}

const deactivateHighlightElement = () => {
  document.removeEventListener('mouseover', highlightElement)
  const target = document.elementFromPoint(mousePos.x, mousePos.y)
  if (target) {
    removeReadaptHighlightClass(target)()
  }
}

// READING TOOLS
browser.runtime.onMessage.addListener((message) => {
  if (message === 'ADD_MASK' && !ReadingToolsMask.state.enabled) {
    if (ReadingToolsRuler.state.enabled) {
      ReadingToolsRuler.remove()
    }
    ReadingToolsMask.add()
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === 'ADD_RULER' && !ReadingToolsRuler.state.enabled) {
    if (ReadingToolsMask.state.enabled) {
      ReadingToolsMask.remove()
    }
    ReadingToolsRuler.add()
  }
})

browser.runtime.onMessage.addListener((message) => {
  if (message === 'RESET') {
    ReadingToolsMask.remove()
    ReadingToolsRuler.remove()
  }
})

browser.runtime.onMessage.addListener(async (message) => {
  if (message === 'UPDATE_MASK') {
    const { maskSettings } = await browser.storage.sync.get('maskSettings')
    ReadingToolsMask.updateSettings(mousePos.y, maskSettings)
  }
})

browser.runtime.onMessage.addListener(async (message) => {
  if (message === 'UPDATE_RULER') {
    const { ruleSettings } = await browser.storage.sync.get('ruleSettings')
    ReadingToolsRuler.updateSettings(ruleSettings)
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'ESC' || event.key === 'Escape') {
    ReadingToolsRuler.remove()
    ReadingToolsMask.remove()
  }
})
// keyboard shortcuts for reading tools
const map = { r: false, n: false, Control: false, Meta: false, Alt: false }
document.addEventListener('keydown', (event) => {
  if (event.key in map) {
    ;(map as { [key: string]: boolean })[event.key] = true
    if ((map['Control'] || map['Meta']) && map['Alt']) {
      if (map['r']) {
        if (ReadingToolsRuler.state.enabled) {
          ReadingToolsRuler.remove()
        } else {
          if (ReadingToolsMask.state.enabled) {
            ReadingToolsMask.remove()
          }
          ReadingToolsRuler.add()
        }
      } else if (map['n']) {
        if (ReadingToolsMask.state.enabled) {
          ReadingToolsMask.remove()
        } else {
          if (ReadingToolsRuler.state.enabled) {
            ReadingToolsRuler.remove()
          }
          ReadingToolsMask.add()
        }
      }
    }
  }
})
document.addEventListener('keyup', (event) => {
  if (event.key in map) {
    ;(map as { [key: string]: boolean })[event.key] = false
  }
})
// end reading tools

// get extension state
getExtensionEnabled()
  .then(async (enabled) => {
    if (enabled) {
      await enableReadapt()
    }
  })
  .catch(console.error)

// disable highlight element if visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    deactivateHighlightElement()
  }
})

const enableReadapt = async (): Promise<void> => {
  await enableAdaptSelection()
  await loadVisualEngine()
  const { ruleSettings } = await browser.storage.sync.get('ruleSettings')
  await ReadingToolsRuler.updateSettings(ruleSettings)
  const { maskSettings } = await browser.storage.sync.get('maskSettings')
  await ReadingToolsMask.updateSettings(mousePos.y, maskSettings)
}
