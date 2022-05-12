import { AnaliseTextFn } from '@readapt/text-engine'
import { Settings } from '@readapt/settings'

import { adaptHtmlElement } from './adaptHtmlElement'

/**
 * Adapt the html element passed by parameter using the settings. Css styles will be scoped using scope prefix.
 * The html element SHOULD be a DOM element attached to {@link Document}
 */
export type AdaptHtmlElementFn = (htmlElement: HTMLElement, settings: Settings, scope: string) => void

/**
 * build a function to adapt an html element
 * @param analyse the {@link AnaliseTextFn} used to adapt the text content
 */
const buildAdaptHtmlElement = (analyse: AnaliseTextFn): AdaptHtmlElementFn => {
  return adaptHtmlElement(analyse)
}

export { buildAdaptHtmlElement }
