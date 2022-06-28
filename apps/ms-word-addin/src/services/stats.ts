import { config } from '@/constants/config'

const trackAdaptEvent = () => {
  fetch(`${config.matomoURL}/matomo.php?idsite=2&action_name=adapt&rec=1`, { mode: 'cors' }).catch(console.error)
}

export { trackAdaptEvent }
