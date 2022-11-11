import { Storage, STORAGE_KEY_SETTINGS_V1, STORAGE_KEY_SETTINGS_V2 } from '@/storage'

export async function migrateSingleToMultiProfile(storage: Storage) {
  const settingsOld = await storage.getItem(STORAGE_KEY_SETTINGS_V1)
  if (!settingsOld) {
    return
  }
  await storage.setItem(STORAGE_KEY_SETTINGS_V2, [
    {
      name: 'Default',
      profile: settingsOld
    }
  ])
}
