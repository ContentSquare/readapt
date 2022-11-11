import { Persistence, STORAGE_KEY_SETTINGS_V1, STORAGE_KEY_SETTINGS_V2 } from '@/persistence'

export async function migrateSingleToMultiProfile(persistence: Persistence) {
  const settingsOld = await persistence.getItem(STORAGE_KEY_SETTINGS_V1)
  if (!settingsOld) {
    return
  }
  await persistence.setItem(STORAGE_KEY_SETTINGS_V2, [
    {
      name: 'Default',
      profile: settingsOld
    }
  ])
}
