import type { StorageType } from '@/shared/lib/storage'
import { singleToMultiProfileMigrate } from './list/singleToMultiProfilesMigrate'

export async function textPreferencesStorageMigrate(storage: StorageType): Promise<void> {
  await singleToMultiProfileMigrate(storage)
  // add here new migration scripts....
}
