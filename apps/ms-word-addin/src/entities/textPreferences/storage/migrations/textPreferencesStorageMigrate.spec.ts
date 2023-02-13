import { StorageMemory } from '@/shared/lib/storage'
import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../../config/storage'
import { textPreferencesStorageMigrate } from './textPreferencesStorageMigrate'
import { storageStateV1Fixture, storageStateV2Fixture } from './textPreferencesStorageFixtures'

describe('textPreferencesStorageMigrate()', () => {
  it('should execute the migration scripts', async () => {
    const storage = new StorageMemory({
      [STORAGE_KEY_V1]: storageStateV1Fixture
    })

    await textPreferencesStorageMigrate(storage)

    expect(await storage.get(null)).toEqual({
      [STORAGE_KEY_V1]: storageStateV1Fixture,
      [STORAGE_KEY_V2]: storageStateV2Fixture
    })
  })
})
