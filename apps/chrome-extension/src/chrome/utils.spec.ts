import { getStoredSettings, saveSettings } from './utils'
import { settings } from '../../tests/fixtures/settings'
import { chrome } from 'jest-chrome'

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
        const storageState = { settings, otherKey: 'other value' }
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
