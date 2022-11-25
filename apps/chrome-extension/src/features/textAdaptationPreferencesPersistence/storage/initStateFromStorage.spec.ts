import { initStateFromStorage } from './initStateFromStorage'
import {
  TextAdaptationPreferences,
  textAdaptationProfileFixture,
  useTextAdaptationPreferences,
  STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES
} from '@/entities/textAdaptationPreferences'
import { MemoryStorage } from '@/shared/storage'

describe('initStateFromStorage()', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  describe('when storage contains preferences', () => {
    it('should initialize preferences state from storage', async () => {
      const preferences: TextAdaptationPreferences = {
        activeProfileId: textAdaptationProfileFixture.id,
        profiles: [textAdaptationProfileFixture]
      }
      const storage = new MemoryStorage({ [STORAGE_KEY_TEXT_ADAPTATION_PREFERENCES]: preferences })

      await initStateFromStorage(storage)

      const { profiles } = useTextAdaptationPreferences()
      expect(profiles.value).toEqual(preferences.profiles)
    })
  })

  describe('when storage does not contain preferences', () => {
    it('should default to initial state', async () => {
      const storage = new MemoryStorage()

      await initStateFromStorage(storage)

      const { profiles } = useTextAdaptationPreferences()
      expect(profiles.value).toEqual([])
    })
  })
})
