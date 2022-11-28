import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from './constants'
import { MemoryStorage } from '@/shared/storage'
import { executeStorageMigrations } from './executeMigrations'
import { storageStateV1, storageStateV2 } from './storageStateByVersions'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const storage = new MemoryStorage({
      [STORAGE_KEY_V1]: storageStateV1
    })

    await executeStorageMigrations(storage)

    expect(await storage.get(null)).toEqual({
      [STORAGE_KEY_V1]: storageStateV1,
      [STORAGE_KEY_V2]: storageStateV2
    })
  })
})
