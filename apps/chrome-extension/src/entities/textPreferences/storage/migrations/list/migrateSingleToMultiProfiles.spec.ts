import { MemoryStorage } from '@/shared/storage'
import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../../../config/storage'
import { StorageItems } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './migrateSingleToMultiProfiles'
import { storageStateV1Fixture, storageStateV2Fixture } from '../storageStateVersionsFixtures'

describe('migrateSingleToMultiProfile()', () => {
  const expectStorageStateToEqual = async (storage: MemoryStorage, expectedState: StorageItems): Promise<void> => {
    expect(await storage.get([STORAGE_KEY_V1, STORAGE_KEY_V2])).toEqual(expectedState)
  }

  describe('when storage contains neither single nor multi profile', () => {
    it('should do nothing', async () => {
      const storage = new MemoryStorage()

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_KEY_V1]: undefined,
        [STORAGE_KEY_V2]: undefined
      })
    })
  })

  describe('when storage contains both single and multi profile', () => {
    it('should do nothing', async () => {
      const storageState = {
        [STORAGE_KEY_V1]: storageStateV1Fixture,
        [STORAGE_KEY_V2]: storageStateV2Fixture
      }
      const storage = new MemoryStorage(storageState)

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, storageState)
    })
  })

  describe('when storage contains single but no multi profile', () => {
    it('should create multi profile from single profile format', async () => {
      const storage = new MemoryStorage({
        [STORAGE_KEY_V1]: storageStateV1Fixture
      })

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_KEY_V1]: storageStateV1Fixture,
        [STORAGE_KEY_V2]: storageStateV2Fixture
      })
    })
  })
})
