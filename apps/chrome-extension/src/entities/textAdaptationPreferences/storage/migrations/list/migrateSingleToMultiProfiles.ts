import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../../../config/storage'
import { Storage } from '@/shared/storage'

export async function migrateSingleToMultiProfile(storage: Storage) {
  const { [STORAGE_KEY_V1]: storageStateV1 } = await storage.get(STORAGE_KEY_V1)
  if (!storageStateV1) {
    return
  }
  const storageStateV2 = {
    activeProfileId: '1',
    profiles: [
      {
        name: 'Default',
        id: '1',
        settings: storageStateV1
      }
    ]
  }
  await storage.set({ [STORAGE_KEY_V2]: storageStateV2 })
}
