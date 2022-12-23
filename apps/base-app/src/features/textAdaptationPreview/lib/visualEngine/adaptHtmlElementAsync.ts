import { buildAdaptHtmlElement, type AdaptHtmlElementFn } from '@readapt/visual-engine'

/**
 * @see {@link AdaptHtmlElementFn}
 */
const adaptHtmlElementAsyncFn = async (): Promise<AdaptHtmlElementFn> => {
  const { analyse } = await import(/* webpackChunkName: "text-engine" */ '@readapt/text-engine')
  return buildAdaptHtmlElement(analyse)
}

export { adaptHtmlElementAsyncFn }
