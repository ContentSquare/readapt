import { STORAGE_SETTINGS_KEY_V1, STORAGE_SETTINGS_KEY_V2 } from '../constants'
import { MemoryStorage } from '@/shared/storage'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const profile = { language: 'en', fontSize: '140%' }
    const storage = new MemoryStorage({
      [STORAGE_SETTINGS_KEY_V1]: profile
    })

    await executeMigrations(storage)

    expect(await storage.get(null)).toEqual({
      [STORAGE_SETTINGS_KEY_V1]: expect.anything(),
      [STORAGE_SETTINGS_KEY_V2]: expect.anything()
    })
  })
})
