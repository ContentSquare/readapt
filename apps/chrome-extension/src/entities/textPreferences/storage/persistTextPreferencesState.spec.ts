import { MemoryStorage } from '@/shared/storage'
import { persistTextPreferencesState } from './persistTextPreferencesState'
import { STORAGE_KEY_TEXT_PREFERENCES } from '../config/storage'
import { textPreferencesFixture } from '../model/textPreferencesFixtures'
import { useTextPreferences } from '../model/state/useTextPreferences'

describe('persistsTextPreferencesState()', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  describe('on initial run', () => {
    it('should set preferences state from storage', async () => {
      const storage = new MemoryStorage({
        [STORAGE_KEY_TEXT_PREFERENCES]: textPreferencesFixture
      })
      const { preferences } = useTextPreferences()

      const stopWatcher = await persistTextPreferencesState(storage)

      expect(preferences).toEqual(textPreferencesFixture)
      stopWatcher()
    })
  })

  describe('when preferences state changes', () => {
    it('should write preferences state to storage', async () => {
      const storage = new MemoryStorage()
      const { setActiveProfileId, setProfiles } = useTextPreferences()

      const stopWatcher = await persistTextPreferencesState(storage)
      setProfiles(textPreferencesFixture.profiles)
      setActiveProfileId(textPreferencesFixture.activeProfileId)

      expect(await storage.get(STORAGE_KEY_TEXT_PREFERENCES)).toEqual({
        [STORAGE_KEY_TEXT_PREFERENCES]: textPreferencesFixture
      })
      stopWatcher()
    })
  })
})
