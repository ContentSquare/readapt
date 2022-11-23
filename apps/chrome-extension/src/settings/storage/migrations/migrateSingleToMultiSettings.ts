import { STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '../constants'
import { Storage } from '@/shared/storage'

export async function migrateSingleToMultiSettings(storage: Storage) {
  const { [STORAGE_SETTINGS_KEY_V1]: settingsInOldFormat } = await storage.get(STORAGE_SETTINGS_KEY_V1)
  if (!settingsInOldFormat) {
    return
  }
  const settingsInNewFormat = [
    {
      name: 'Default',
      settings: settingsInOldFormat
    }
  ]
  await storage.set({ [STORAGE_SETTINGS_KEY_V2]: settingsInNewFormat })
}