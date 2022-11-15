import { Storage } from '@/shared/storage'
import { migrateSingleToMultiSettings } from './migrateSingleToMultiSettings'

export async function executeMigrations(storage: Storage): Promise<void> {
  await migrateSingleToMultiSettings(storage)
  // add here new migration scripts....
}
