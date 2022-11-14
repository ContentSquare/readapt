import { Storage, STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '@/shared/storage'

export async function migrateSingleToMultiProfile(storage: Storage) {
  const { [STORAGE_SETTINGS_KEY_V1]: settingsInOldFormat } = await storage.get(STORAGE_SETTINGS_KEY_V1)
  if (!settingsInOldFormat) {
    return
  }
  const settingsInNewFormat = [
    {
      name: 'Default',
      profile: settingsInOldFormat
    }
  ]
  await storage.set({ [STORAGE_SETTINGS_KEY_V2]: settingsInNewFormat })
}
