import { PersistenceMock } from '@/persistence/persistenceMock'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', async () => {
    const profile = { language: 'en', fontSize: '140%' }
    const persistence = new PersistenceMock({
      settings: profile
    })

    await executeMigrations(persistence)

    expect(await persistence.getItem('settings')).toBeTruthy()
    expect(await persistence.getItem('settings@2')).toBeTruthy()
  })
})
