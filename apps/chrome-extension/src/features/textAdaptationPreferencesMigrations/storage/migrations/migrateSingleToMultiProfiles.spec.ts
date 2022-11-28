import { MemoryStorage } from '@/shared/storage'
import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from '../constants'
import { StorageItems } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './migrateSingleToMultiProfiles'
import { storageStateV1, storageStateV2 } from '../storageStateByVersions'

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
        [STORAGE_KEY_V1]: storageStateV1,
        [STORAGE_KEY_V2]: storageStateV2
      }
      const storage = new MemoryStorage(storageState)

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, storageState)
    })
  })

  describe('when storage contains single but no multi profile', () => {
    it('should create multi profile from single profile format', async () => {
      const storage = new MemoryStorage({
        [STORAGE_KEY_V1]: storageStateV1
      })

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_KEY_V1]: storageStateV1,
        [STORAGE_KEY_V2]: storageStateV2
      })
    })
  })
})
