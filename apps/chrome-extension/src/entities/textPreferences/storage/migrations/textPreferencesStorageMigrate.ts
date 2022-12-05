import { Storage } from '@/shared/storage'
import { singleToMultiProfileMigrate } from './list/singleToMultiProfilesMigrate'

export async function textPreferencesStorageMigrate(storage: Storage): Promise<void> {
  await singleToMultiProfileMigrate(storage)
  // add here new migration scripts....
}
