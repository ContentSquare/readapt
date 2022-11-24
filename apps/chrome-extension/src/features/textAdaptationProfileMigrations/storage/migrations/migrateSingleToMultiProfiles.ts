import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../constants'
import { Storage } from '@/shared/storage'

export async function migrateSingleToMultiProfiles(storage: Storage) {
  const { [STORAGE_KEY_V1]: storageStateV1 } = await storage.get(STORAGE_KEY_V1)
  if (!storageStateV1) {
    return
  }
  const storageStateV2 = [
    {
      name: 'Default',
      id: '1',
      settings: storageStateV1
    }
  ]
  await storage.set({ [STORAGE_KEY_V2]: storageStateV2 })
}
