declare const __MATOMO_URL__: string // __MATOMO_URL__ gets replaced with the actual value during build

export const trackAdaptEvent = (isSelection: boolean) => {
  let url = `${__MATOMO_URL__}/matomo.php?idsite=2&action_name=adaptSelection&rec=1&ua=unknown&uadata={}`
  url += isSelection ? '&action_name=adaptSelection' : '&action_name=adaptDocument'

  fetch(url, { mode: 'cors' }).catch(console.error)
}
