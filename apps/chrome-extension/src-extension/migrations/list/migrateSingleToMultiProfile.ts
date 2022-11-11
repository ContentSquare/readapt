import { Persistence } from '@/persistence/persistence'

export async function migrateSingleToMultiProfile(persistence: Persistence) {
  const settingsOld = await persistence.getItem('settings')
  if (!settingsOld) {
    return
  }
  await persistence.setItem('settings@2', [
    {
      name: 'Default',
      profile: settingsOld
    }
  ])
}
