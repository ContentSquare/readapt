import { Storage, STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_LEY_V2 } from '@/storage'

export async function migrateSingleToMultiProfile(storage: Storage) {
  const settingsOld = await storage.getItem(STORAGE_SETTINGS_KEY_V1)
  if (!settingsOld) {
    return
  }
  await storage.setItem(STORAGE_SETTINGS_LEY_V2, [
    {
      name: 'Default',
      profile: settingsOld
    }
  ])
}
