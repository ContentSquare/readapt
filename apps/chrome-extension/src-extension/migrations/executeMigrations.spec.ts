import { StorageMock, STORAGE_KEY_SETTINGS_V1, STORAGE_KEY_SETTINGS_V2 } from '@/storage'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const profile = { language: 'en', fontSize: '140%' }
    const storage = new StorageMock({
      [STORAGE_KEY_SETTINGS_V1]: profile
    })

    await executeMigrations(storage)

    expect(await storage.getItem(STORAGE_KEY_SETTINGS_V1)).toBeTruthy()
    expect(await storage.getItem(STORAGE_KEY_SETTINGS_V2)).toBeTruthy()
  })
})
