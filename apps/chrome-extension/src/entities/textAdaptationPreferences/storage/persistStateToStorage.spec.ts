import { MemoryStorage } from '@/shared/storage'
import { persistStateToStorage } from './persistStateToStorage'
import { STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES } from '../config/storage'
import { preferences } from '../model/preferencesFixtures'
import { usePreferences } from '../model/state/usePreferences'

describe('persistsStateToStorage()', () => {
  afterEach(() => {
    usePreferences().reset()
  })

  describe('on initial run', () => {
    it('should set preferences state from storage', async () => {
      const storage = new MemoryStorage({
        [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferences
      })
      const { preferencesState } = usePreferences()

      const stopWatcher = await persistStateToStorage(storage)

      expect(preferencesState).toEqual(preferences)
      stopWatcher()
    })
  })

  describe('when preferences state changes', () => {
    it('should write preferences state to storage', async () => {
      const storage = new MemoryStorage()
      const { setActiveProfileId, setProfiles } = usePreferences()

      const stopWatcher = await persistStateToStorage(storage)
      setProfiles(preferences.profiles)
      setActiveProfileId(preferences.activeProfileId)

      expect(await storage.get(STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES)).toEqual({
        [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferences
      })
      stopWatcher()
    })
  })
})
