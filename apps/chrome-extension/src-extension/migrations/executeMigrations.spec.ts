import { PersistenceMock, STORAGE_KEY_SETTINGS_V1, STORAGE_KEY_SETTINGS_V2 } from '@/persistence'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const profile = { language: 'en', fontSize: '140%' }
    const persistence = new PersistenceMock({
      settings: profile
    })

    await executeMigrations(persistence)

    expect(await persistence.getItem(STORAGE_KEY_SETTINGS_V1)).toBeTruthy()
    expect(await persistence.getItem(STORAGE_KEY_SETTINGS_V2)).toBeTruthy()
  })
})
