import { OpacityOption } from '@readapt/settings'

type LineHeight = string
type ShadeAlternateLinesClass = `readapt-shade-alternate-lines-${LineHeight}`

const shadeLinesClasses = new Map<ShadeAlternateLinesClass, string>()

const adaptShadeAlternateLinesForText = (shadeLineOpacity: string) => {
  const lineHeight = getLineHeightForText()
  const { className, value } = buildShadeLineClass(lineHeight, shadeLineOpacity)

  return { className, style: value }
}

const getLineHeightForText = (): number => {
  const boundingRect = { height: 100 }

  const computed = { fontSize: '16', lineHeight: '16' }

  const fontSizeInt = parseInt(computed.fontSize, 10)

  const lineHeight = computed.lineHeight === 'normal' ? 1.2 * fontSizeInt : parseFloat(computed.lineHeight)

  // adjust lineHeight to element height
  const elementHeight = boundingRect.height
  let lineHeightFromLines = 0
  if (!isNaN(elementHeight)) {
    // line height can't be small than fontSize
    const realLineHeight = Math.max(lineHeight, fontSizeInt)
    const countLines = Math.round(elementHeight / realLineHeight)
    if (countLines > 0) {
      lineHeightFromLines = elementHeight / countLines
    }
  }

  return Math.max(lineHeight, lineHeightFromLines)
}

const adaptShadeAlternateLines = (htmlElement: HTMLElement, shadeLineOpacity: OpacityOption, scope: string) => {
  if (htmlElement.tagName === 'P') {
    addShadeAlternateLinesClass(htmlElement, shadeLineOpacity)
  } else {
    Array.from(htmlElement.getElementsByTagName('p')) //
      .forEach((pElement) => addShadeAlternateLinesClass(pElement, shadeLineOpacity))
  }
  return Array.from(shadeLinesClasses.values())
    .map((style) => `.readapt-${scope} ${style}`)
    .join(' ')
}

const addShadeAlternateLinesClass = (htmlElement: HTMLElement, shadeLineOpacity: string) => {
  const lineHeight = getLineHeight(htmlElement)
  const { className, value } = buildShadeLineClass(lineHeight, shadeLineOpacity)
  htmlElement.classList.add(className)
  shadeLinesClasses.set(className, value)
}

const buildShadeLineClass = (lineHeight: number, shadeLineOpacity: string): { className: ShadeAlternateLinesClass; value: string } => {
  const shadeLineColor = `#c8c8c8${shadeLineOpacity}`
  const lineHeightPx = lineHeight.toFixed(2) + 'px'
  const lineHeightX2 = (2 * lineHeight).toFixed(2) + 'px'
  const shadeLineClassName: ShadeAlternateLinesClass = `readapt-shade-alternate-lines-${lineHeightPx.replace(/\./, '-')}`

  return {
    className: shadeLineClassName,
    value: `.${shadeLineClassName} {
      background: repeating-linear-gradient(transparent, transparent ${lineHeightPx}, ${shadeLineColor} ${lineHeightPx}, ${shadeLineColor} ${lineHeightX2});
      background-clip: content-box;
      background-origin: content-box;
    }`
  }
}

const getLineHeight = (htmlElement: HTMLElement): number => {
  const textElement = htmlElement.querySelector('.readapt-content') as HTMLElement

  const computed = getComputedStyle(textElement || htmlElement)
  const fontSizeInt = parseInt(computed.fontSize, 10)

  const lineHeight = computed.lineHeight === 'normal' ? 1.2 * fontSizeInt : parseFloat(computed.lineHeight)

  // adjust lineHeight to element height
  const elementHeight = Math.max(getInnerHeight(htmlElement), textElement?.getBoundingClientRect().height)
  let lineHeightFromLines = 0
  if (!isNaN(elementHeight)) {
    // line height can't be small than fontSize
    const realLineHeight = Math.max(lineHeight, fontSizeInt)
    const countLines = Math.round(elementHeight / realLineHeight)
    if (countLines > 0) {
      lineHeightFromLines = elementHeight / countLines
    }
  }

  return Math.max(lineHeight, lineHeightFromLines)
}

const getInnerHeight = (elm: HTMLElement): number => {
  const computed = getComputedStyle(elm)
  const padding = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom)

  return elm.getBoundingClientRect().height - padding
}

const cleanShadeAlternateLines = (htmlElement: HTMLElement) => {
  const shadeLinesClassesList = Array.from(shadeLinesClasses.keys())
  const removeShadeAlternateLinesClasses = (elem: HTMLElement) => elem.classList.remove(...shadeLinesClassesList)

  if (htmlElement.tagName === 'P') {
    removeShadeAlternateLinesClasses(htmlElement)
  } else {
    Array.from(htmlElement.getElementsByTagName('p')).forEach(removeShadeAlternateLinesClasses)
  }
}

export { adaptShadeAlternateLines, cleanShadeAlternateLines, adaptShadeAlternateLinesForText }
