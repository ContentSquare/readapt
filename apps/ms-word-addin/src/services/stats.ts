import { config } from '@/constants/config'

const trackAdaptEvent = (isSelection: boolean) => {
  let url = `${config.matomoURL}/.php?idsite=2&action_name=adaptSelection&rec=1&ua=unknown&uadata={}`
  url += isSelection ? '&action_name=adaptSelection' : '&action_name=adaptDocument'

  fetch(url).catch(console.error)
}

export { trackAdaptEvent }
