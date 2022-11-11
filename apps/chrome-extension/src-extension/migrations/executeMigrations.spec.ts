import { PersistenceMock } from '@/persistence/persistenceMock'
import { executeMigrations } from './executeMigrations'

describe('executeMigrations()', () => {
  it('should execute the migration scripts', () => {
    const profile = { language: 'en', fontSize: '140%' }
    const persistence = new PersistenceMock({
      settings: profile
    })

    executeMigrations(persistence)

    expect(persistence.getItem('settings')).toBeTruthy()
    expect(persistence.getItem('settings@2')).toBeTruthy()
  })
})
