import { Persistence } from '@/persistence/persistence'
import { migrateSingleToMultiProfile } from './list/migrateSingleToMultiProfile'

export function executeMigrations(persistence: Persistence): void {
  migrateSingleToMultiProfile(persistence)
  // add here new migration scripts....
}
