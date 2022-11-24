import { getStoredSettings, saveSettings } from './utils'
import { settings } from '../shared/tests/fixtures/settings'
import { chrome } from 'jest-chrome'
import { TextAdaptationProfile, STORAGE_KEY_TEXT_ADAPTATION_PROFILES } from '@/entities/textAdaptationProfile'

describe('chrome/utils', () => {
  const makeGetter = (storageState: Record<string, unknown>) => {
    return (key: unknown) => {
      if (typeof key === 'string') {
        return { [key]: storageState[key] }
      }
    }
  }
  const makeSetter = (storageState: Record<string, unknown>) => {
    return (appendStorageState: Record<string, unknown>) => {
      Object.assign(storageState, appendStorageState)
    }
  }

  describe('getStoredSettings()', () => {
    describe('when extension storage contains settings', () => {
      it('should return the settings', async () => {
        const settingsStorageModel: TextAdaptationProfile[] = [
          {
            name: 'Profile',
            id: '1',
            settings
          }
        ]
        const storageState = { [STORAGE_KEY_TEXT_ADAPTATION_PROFILES]: settingsStorageModel, otherKey: 'other value' }
        chrome.storage.local.get.mockImplementationOnce(makeGetter(storageState))

        expect(await getStoredSettings()).toEqual(settings)
      })
    })

    describe('when extension storage does not contain settings', () => {
      it('should return undefined', async () => {
        const storageState = { otherKey: 'other value' }
        chrome.storage.local.get.mockImplementationOnce(makeGetter(storageState))

        expect(await getStoredSettings()).toBeUndefined()
      })
    })
  })

  describe('saveSettings()', () => {
    it('should add settings to extension storage', async () => {
      const storageState = { otherKey: 'other value' }
      chrome.storage.local.get.mockImplementationOnce(makeGetter(storageState))
      chrome.storage.local.set.mockImplementationOnce(makeSetter(storageState))

      await saveSettings(settings)

      expect(await getStoredSettings()).toEqual(settings)
    })
  })
})
