import { analyse } from '@readapt/text-engine'
import { buildAdaptHtmlElement } from './visualEngineFactory'

const adaptHtmlElement = buildAdaptHtmlElement(analyse)

export { adaptHtmlElement }
