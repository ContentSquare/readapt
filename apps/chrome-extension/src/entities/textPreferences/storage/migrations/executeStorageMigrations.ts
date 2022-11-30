import { Storage } from '@/shared/storage'
import { migrateSingleToMultiProfile } from './list/migrateSingleToMultiProfiles'

export async function executeStorageMigrations(storage: Storage): Promise<void> {
  await migrateSingleToMultiProfile(storage)
  // add here new migration scripts....
}
