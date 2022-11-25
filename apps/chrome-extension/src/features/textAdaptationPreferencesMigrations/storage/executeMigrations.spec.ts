import { STORAGE_KEY_V1, STORAGE_KEY_V2 } from './constants'
import { MemoryStorage } from '@/shared/storage'
import { TestFixtures } from '@/shared/tests'
import { executeStorageMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const storage = new MemoryStorage({
      [STORAGE_KEY_V1]: TestFixtures.settings
    })

    await executeStorageMigrations(storage)

    expect(await storage.get(null)).toEqual({
      [STORAGE_KEY_V1]: expect.anything(),
      [STORAGE_KEY_V2]: expect.anything()
    })
  })
})
