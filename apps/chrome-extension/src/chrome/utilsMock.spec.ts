import { getStoredSettings, saveSettings } from './utilsMock'
import { settings } from '../shared/tests/fixtures/settings'
import { TextAdaptationProfile, STORAGE_KEY_TEXT_ADAPTATION_PROFILES } from '@/entities/textAdaptationProfile'

describe('chrome/utilsMock', () => {
  const setStorageFromState = (state: Record<string, unknown>): void => {
    Object.keys(state).forEach((key) => localStorage.setItem(key, JSON.stringify(state[key])))
  }

  afterEach(() => {
    localStorage.clear()
  })

  describe('getStoredSettings()', () => {
    describe('when extension storage contains settings', () => {
      it('should return the settings', async () => {
        const profiles: TextAdaptationProfile[] = [
          {
            name: 'Profile',
            id: '1',
            settings
          }
        ]
        setStorageFromState({ [STORAGE_KEY_TEXT_ADAPTATION_PROFILES]: profiles, otherKey: 'other value' })

        expect(await getStoredSettings()).toEqual(settings)
      })
    })

    describe('when extension storage does not contain settings', () => {
      it('should return undefined', async () => {
        setStorageFromState({ otherKey: 'other value' })

        expect(await getStoredSettings()).toBeUndefined()
      })
    })
  })

  describe('saveSettings()', () => {
    it('should add settings to extension storage', async () => {
      const storageState = { otherKey: 'other value' }
      setStorageFromState(storageState)

      await saveSettings(settings)

      expect(await getStoredSettings()).toEqual(settings)
    })
  })
})
