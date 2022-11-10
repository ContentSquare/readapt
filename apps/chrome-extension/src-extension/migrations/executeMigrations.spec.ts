import { PersistenceMock } from '@/persistence/persistenceMock'
import { executeMigrations } from './executeMigrations'
import { SingleToMultiProfileMigration } from './list/singleToMultiProfileMigration'

describe('executeMigrations()', () => {
  it('should execute the migration scripts in the right order', () => {
    const singleToMultiProfileMigrateSpy = jest.spyOn(SingleToMultiProfileMigration.prototype, 'migrate')

    executeMigrations(new PersistenceMock())

    expect(singleToMultiProfileMigrateSpy).toHaveBeenCalled()

    jest.resetAllMocks()
  })
})
