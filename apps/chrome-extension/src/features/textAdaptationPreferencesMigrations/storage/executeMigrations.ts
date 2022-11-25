import { Storage } from '@/shared/storage'
import { migrateSingleToMultiProfiles } from './migrations/migrateSingleToMultiProfiles'

export async function executeStorageMigrations(storage: Storage): Promise<void> {
  await migrateSingleToMultiProfiles(storage)
  // add here new migration scripts....
}
