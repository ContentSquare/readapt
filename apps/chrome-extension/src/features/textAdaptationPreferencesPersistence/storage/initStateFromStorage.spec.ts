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

  it('should preferences state from storage', async () => {
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
