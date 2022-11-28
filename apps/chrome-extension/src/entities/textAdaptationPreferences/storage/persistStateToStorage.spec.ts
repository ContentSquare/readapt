import { MemoryStorage } from '@/shared/storage'
import { persistStateToStorage } from './persistStateToStorage'
import { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from '../config/storage'
import { preferences } from '../model/preferencesFixtures'
import { useTextAdaptationPreferences } from '../model/state/usePreferences'

describe('persistsStateToStorage()', () => {
  describe('on initial run', () => {
    it('should set preferences state from storage', async () => {
      const storage = new MemoryStorage({
        [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferences
      })
      const { preferencesState } = useTextAdaptationPreferences()

      await persistStateToStorage(storage)

      expect(preferencesState).toEqual(preferences)
    })
  })
})
