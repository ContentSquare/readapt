import { PersistenceMock } from '@/persistence/persistenceMock'
import { migrateSingleToMultiProfile } from './migrateSingleToMultiProfile'

describe('migrateSingleToMultiProfile', () => {
  const SETTINGS_KEY_OLD = 'settings'
  const SETTINGS_KEY_NEW = 'settings@2'

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
      const persistence = new PersistenceMock()

      await migrateSingleToMultiProfile(persistence)

      expect(await persistence.getItem(SETTINGS_KEY_OLD)).toBeUndefined()
      expect(await persistence.getItem(SETTINGS_KEY_NEW)).toBeUndefined()
    })
  })

  describe('when storage contains old and new settings', () => {
    it('should do nothing', async () => {
      const persistence = new PersistenceMock({
        [SETTINGS_KEY_OLD]: settingsOld,
        [SETTINGS_KEY_NEW]: settingsNew
      })

      await migrateSingleToMultiProfile(persistence)

      expect(await persistence.getItem(SETTINGS_KEY_OLD)).toEqual(settingsOld)
      expect(await persistence.getItem(SETTINGS_KEY_NEW)).toEqual(settingsNew)
    })
  })

  describe('when storage contains old settings and no new settings', () => {
    it('should create new settings from old settings', async () => {
      const persistence = new PersistenceMock({
        [SETTINGS_KEY_OLD]: settingsOld
      })

      await migrateSingleToMultiProfile(persistence)

      expect(await persistence.getItem(SETTINGS_KEY_OLD)).toEqual(settingsOld)
      expect(await persistence.getItem(SETTINGS_KEY_NEW)).toEqual(settingsNew)
    })
  })
})
