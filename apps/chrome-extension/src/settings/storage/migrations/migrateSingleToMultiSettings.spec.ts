import { MemoryStorage } from '@/shared/storage'
import { STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '../constants'
import { StorageItems } from '@/shared/storage'
import { migrateSingleToMultiSettings } from './migrateSingleToMultiSettings'

describe('migrateSingleToMultiSettings()', () => {
  const settings = { language: 'en', fontSize: '140%' }
  const storageStateOldFormat = settings
  const storageStateNewFormat = [
    {
      name: 'Default',
      settings
    }
  ]

  const expectStorageStateToEqual = async (storage: MemoryStorage, expectedState: StorageItems): Promise<void> => {
    expect(await storage.get([STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2])).toEqual(expectedState)
  }

  describe('when storage contains neither single nor multi formats', () => {
    it('should do nothing', async () => {
      const storage = new MemoryStorage()

      await migrateSingleToMultiSettings(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_SETTINGS_KEY_V1]: undefined,
        [STORAGE_SETTINGS_KEY_V2]: undefined
      })
    })
  })

  describe('when storage contains both single and multi formats', () => {
    it('should do nothing', async () => {
      const state = {
        [STORAGE_SETTINGS_KEY_V1]: storageStateOldFormat,
        [STORAGE_SETTINGS_KEY_V2]: storageStateNewFormat
      }
      const storage = new MemoryStorage(state)

      await migrateSingleToMultiSettings(storage)

      await expectStorageStateToEqual(storage, state)
    })
  })

  describe('when storage contains single but no multi format', () => {
    it('should create multi format from single format', async () => {
      const storage = new MemoryStorage({
        [STORAGE_SETTINGS_KEY_V1]: storageStateOldFormat
      })

      await migrateSingleToMultiSettings(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_SETTINGS_KEY_V1]: storageStateOldFormat,
        [STORAGE_SETTINGS_KEY_V2]: storageStateNewFormat
      })
    })
  })
})
