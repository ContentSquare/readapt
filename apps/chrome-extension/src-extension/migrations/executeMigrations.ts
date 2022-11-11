import { Persistence } from '@/persistence'
import { migrateSingleToMultiProfile } from './list/migrateSingleToMultiProfile'

export async function executeMigrations(persistence: Persistence): Promise<void> {
  await migrateSingleToMultiProfile(persistence)
  // add here new migration scripts....
}
