import { StorageMock, STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_LEY_V2 } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './migrateSingleToMultiProfile'

describe('migrateSingleToMultiProfile()', () => {
  const profile = { language: 'en', fontSize: '140%' }
  const settingsOld = profile
  const settingsNew = [
    {
      name: 'Default',
      profile
    }
  ]

  describe('when storage does not contain old and new settings', () => {
    it('should do nothing', async () => {
      const storage = new StorageMock()

      await migrateSingleToMultiProfile(storage)

      expect(await storage.getItem(STORAGE_SETTINGS_KEY_V1)).toBeUndefined()
      expect(await storage.getItem(STORAGE_SETTINGS_LEY_V2)).toBeUndefined()
    })
  })

  describe('when storage contains old and new settings', () => {
    it('should do nothing', async () => {
      const storage = new StorageMock({
        [STORAGE_SETTINGS_KEY_V1]: settingsOld,
        [STORAGE_SETTINGS_LEY_V2]: settingsNew
      })

      await migrateSingleToMultiProfile(storage)

      expect(await storage.getItem(STORAGE_SETTINGS_KEY_V1)).toEqual(settingsOld)
      expect(await storage.getItem(STORAGE_SETTINGS_LEY_V2)).toEqual(settingsNew)
    })
  })

  describe('when storage contains old settings and no new settings', () => {
    it('should create new settings from old settings', async () => {
      const storage = new StorageMock({
        [STORAGE_SETTINGS_KEY_V1]: settingsOld
      })

      await migrateSingleToMultiProfile(storage)

      expect(await storage.getItem(STORAGE_SETTINGS_KEY_V1)).toEqual(settingsOld)
      expect(await storage.getItem(STORAGE_SETTINGS_LEY_V2)).toEqual(settingsNew)
    })
  })
})
