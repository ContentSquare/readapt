import { getStoredSettings, saveSettings } from './utilsMock'
import { settings } from '../../tests/fixtures/settings'
import { SettingsStorageModel, STORAGE_SETTINGS_KEY } from '@/settings'

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
        const settingsStorageModel: SettingsStorageModel = [
          {
            name: 'Profile',
            settings
          }
        ]
        setStorageFromState({ [STORAGE_SETTINGS_KEY]: settingsStorageModel, otherKey: 'other value' })

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
