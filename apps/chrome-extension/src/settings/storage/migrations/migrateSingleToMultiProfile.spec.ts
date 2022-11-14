import { MemoryStorage } from '@/shared/storage'
import { STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '../constants'
import { StorageItems } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './migrateSingleToMultiProfile'

describe('migrateSingleToMultiProfile()', () => {
  const profile = { language: 'en', fontSize: '140%' }
  const settingsInOldFormat = profile
  const settingsInNewFormat = [
    {
      name: 'Default',
      profile
    }
  ]

  const expectStorageStateToEqual = async (storage: MemoryStorage, expectedState: StorageItems): Promise<void> => {
    expect(await storage.get([STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2])).toEqual(expectedState)
  }

  describe('when storage contains neither old nor new settings', () => {
    it('should do nothing', async () => {
      const storage = new MemoryStorage()

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_SETTINGS_KEY_V1]: undefined,
        [STORAGE_SETTINGS_KEY_V2]: undefined
      })
    })
  })

  describe('when storage contains both old and new settings', () => {
    it('should do nothing', async () => {
      const state = {
        [STORAGE_SETTINGS_KEY_V1]: settingsInOldFormat,
        [STORAGE_SETTINGS_KEY_V2]: settingsInNewFormat
      }
      const storage = new MemoryStorage(state)

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, state)
    })
  })

  describe('when storage contains old settings but no new settings', () => {
    it('should create new settings from old settings', async () => {
      const storage = new MemoryStorage({
        [STORAGE_SETTINGS_KEY_V1]: settingsInOldFormat
      })

      await migrateSingleToMultiProfile(storage)

      await expectStorageStateToEqual(storage, {
        [STORAGE_SETTINGS_KEY_V1]: settingsInOldFormat,
        [STORAGE_SETTINGS_KEY_V2]: settingsInNewFormat
      })
    })
  })
})
