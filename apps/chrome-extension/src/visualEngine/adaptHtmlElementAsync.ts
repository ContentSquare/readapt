import { Settings } from '@readapt/settings'
import { AdaptHtmlElementFn, buildAdaptHtmlElement } from '@readapt/visual-engine'

/**
 * @see {@link AdaptHtmlElementFn}
 */
const adaptHtmlElementAsync = async (element: HTMLElement, settings: Settings, scope: string): Promise<void> => {
  const { analyse } = await import(/* webpackChunkName: "text-engine" */ '@readapt/text-engine')
  const adaptHtmlElement: AdaptHtmlElementFn = buildAdaptHtmlElement(analyse)
  adaptHtmlElement(element, settings, scope)
}

export { adaptHtmlElementAsync }
