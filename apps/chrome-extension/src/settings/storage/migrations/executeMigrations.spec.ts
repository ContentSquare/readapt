import { MemoryStorage, STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '@/shared/storage'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const profile = { language: 'en', fontSize: '140%' }
    const storage = new MemoryStorage({
      [STORAGE_SETTINGS_KEY_V1]: profile
    })

    await executeMigrations(storage)

    expect(await storage.getItem(STORAGE_SETTINGS_KEY_V1)).toBeTruthy()
    expect(await storage.getItem(STORAGE_SETTINGS_KEY_V2)).toBeTruthy()
  })
})
