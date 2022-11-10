import { Persistence } from '@/persistence/persistence'
import { SingleToMultiProfileMigration } from './list/singleToMultiProfileMigration'

export function executeMigrations(persistence: Persistence): void {
  ;[new SingleToMultiProfileMigration(persistence)].forEach((migration) => {
    migration.migrate()
  })
}
