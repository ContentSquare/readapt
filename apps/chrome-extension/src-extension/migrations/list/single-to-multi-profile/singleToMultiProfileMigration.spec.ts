import { SingleToMultiProfileMigration } from './singleToMultiProfileMigration';
import { Persistence } from '@/persistence/persistence';

describe('SingleToMultiProfileMigration', () => {
  it('should migrate a to b', () => {
    const migration = new SingleToMultiProfileMigration()

    expect(migration.migrate()).toBeUndefined()
  })
})
