import { MemoryStorage } from '@/shared/storage'
import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../../config/storage'
import { executeStorageMigrations } from './executeStorageMigrations'
import { storageStateV1Fixture, storageStateV2Fixture } from './storageStateByVersionsFixtures'

describe('executeStorageMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const storage = new MemoryStorage({
      [STORAGE_KEY_V1]: storageStateV1Fixture
    })

    await executeStorageMigrations(storage)

    expect(await storage.get(null)).toEqual({
      [STORAGE_KEY_V1]: storageStateV1Fixture,
      [STORAGE_KEY_V2]: storageStateV2Fixture
    })
  })
})
