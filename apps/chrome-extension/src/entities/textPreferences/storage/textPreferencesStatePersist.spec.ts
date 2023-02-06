import { StorageMemory } from '@/shared/lib/storage'
import { textPreferencesStatePersist } from './textPreferencesStatePersist'
import { TEXT_PREFERENCES_STORAGE_KEY } from '../config/storage'
import { textPreferencesFixture } from '../model/textPreferencesFixtures'
import { useTextPreferences } from '../model/state/useTextPreferences'
import { nextTick } from 'vue'

describe('textPreferencesStatePersist()', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  describe('on initial run', () => {
    it('should set preferences state from storage', async () => {
      const storage = new StorageMemory({
        [TEXT_PREFERENCES_STORAGE_KEY]: textPreferencesFixture
      })
      const { preferences } = useTextPreferences()

      const stopWatcher = await textPreferencesStatePersist(storage)

      expect(preferences).toEqual(textPreferencesFixture)
      stopWatcher()
    })
  })

  describe('when preferences state changes', () => {
    it('should write preferences state to storage', async () => {
      const storage = new StorageMemory()
      const { setActiveProfileId, setProfiles } = useTextPreferences()

      const stopWatcher = await textPreferencesStatePersist(storage)
      setProfiles(textPreferencesFixture.profiles)
      if (textPreferencesFixture.activeProfileId) {
        setActiveProfileId(textPreferencesFixture.activeProfileId)
      }

      await nextTick()

      expect(await storage.get(TEXT_PREFERENCES_STORAGE_KEY)).toEqual({
        [TEXT_PREFERENCES_STORAGE_KEY]: textPreferencesFixture
      })
      stopWatcher()
    })
  })
})
