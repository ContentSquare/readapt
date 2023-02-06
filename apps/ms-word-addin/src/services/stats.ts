import { config } from '@/constants/config'

const trackAdaptEvent = (isSelection: boolean) => {
  const url = `${config.matomoURL}/.php?idsite=2&action_name=adaptSelection&rec=1&ua=unknown&uadata={}`
  if (isSelection) {
    fetch(`${url}&action_name=adaptSelection`).catch(console.error)
  } else {
    fetch(`${url}&action_name=adaptDocument`).catch(console.error)
  }
}

export { trackAdaptEvent }
