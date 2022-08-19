import { config } from '@/constants/config'

const trackAdaptEvent = (isSelection: boolean) => {
  if (isSelection) {
    fetch(`${config.matomoURL}/matomo.php?idsite=2&action_name=adaptSelection&rec=1`).catch(console.error)
  } else {
    fetch(`${config.matomoURL}/matomo.php?idsite=2&action_name=adaptDocument&rec=1`).catch(console.error)
  }
}

export { trackAdaptEvent }
