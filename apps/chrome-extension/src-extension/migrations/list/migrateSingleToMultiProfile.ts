import { Persistence } from '@/persistence/persistence'

export function migrateSingleToMultiProfile(persistence: Persistence) {
  const settingsOld = persistence.getItem('settings')
  if (!settingsOld) {
    return
  }
  persistence.setItem('settings@2', [
    {
      name: 'Default',
      profile: settingsOld
    }
  ])
}
