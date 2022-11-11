import { Storage } from '@/storage'
import { migrateSingleToMultiProfile } from './list/migrateSingleToMultiProfile'

export async function executeMigrations(storage: Storage): Promise<void> {
  await migrateSingleToMultiProfile(storage)
  // add here new migration scripts....
}
