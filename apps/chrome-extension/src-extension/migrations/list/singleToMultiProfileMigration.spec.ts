import { PersistenceMock } from '@/persistence/persistenceMock'
import { SingleToMultiProfileMigration } from './singleToMultiProfileMigration'

describe('SingleToMultiProfileMigration', () => {
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
    it('should do nothing', () => {
      const persistence = new PersistenceMock()
      const migration = new SingleToMultiProfileMigration(persistence)

      migration.migrate()

      expect(persistence.getItem(SETTINGS_KEY_OLD)).toBeUndefined()
      expect(persistence.getItem(SETTINGS_KEY_NEW)).toBeUndefined()
    })
  })

  describe('when storage contains old and new settings', () => {
    it('should do nothing', () => {
      const persistence = new PersistenceMock({
        [SETTINGS_KEY_OLD]: settingsOld,
        [SETTINGS_KEY_NEW]: settingsNew
      })
      const migration = new SingleToMultiProfileMigration(persistence)

      migration.migrate()

      expect(persistence.getItem(SETTINGS_KEY_OLD)).toEqual(settingsOld)
      expect(persistence.getItem(SETTINGS_KEY_NEW)).toEqual(settingsNew)
    })
  })

  describe('when storage contains old settings and no new settings', () => {
    it('should create new settings from old settings', () => {
      const persistence = new PersistenceMock({
        [SETTINGS_KEY_OLD]: settingsOld
      })

      const migration = new SingleToMultiProfileMigration(persistence)

      migration.migrate()

      expect(persistence.getItem(SETTINGS_KEY_OLD)).toEqual(settingsOld)
      expect(persistence.getItem(SETTINGS_KEY_NEW)).toEqual(settingsNew)
    })
  })
})
