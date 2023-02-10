import { textPreferencesStatePersist } from '@/entities/textPreferences'
import { StorageLocal } from '@/shared/lib/storage'

export function useSetup() {
  const storage = new StorageLocal()
  textPreferencesStatePersist(storage)
}