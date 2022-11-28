import { Storage } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './migrations/migrateSingleToMultiProfiles'

export async function executeStorageMigrations(storage: Storage): Promise<void> {
  await migrateSingleToMultiProfile(storage)
  // add here new migration scripts....
}
