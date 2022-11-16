import { getStoredSettings } from './utils'
import { settings } from '../../tests/fixtures/settings'
import { chrome } from 'jest-chrome'

describe('chrome utils', () => {
  describe('getStoredSettings()', () => {
    describe('when extension storage contains settings', () => {
      it('should return the settings', async () => {
        chrome.storage.local.get.mockImplementationOnce((key) => {
          const storageState: Record<string, unknown> = { settings, otherKey: 'other value' }
          if (typeof key === 'string') {
            return {
              [key]: storageState[key]
            }
          }
        })

        expect(await getStoredSettings()).toEqual(settings)
      })
    })

    describe('when extension storage does not contain settings', () => {
      it('should return undefined', async () => {
        chrome.storage.local.get.mockImplementationOnce(function (key) {
          const storageState: Record<string, unknown> = { otherKey: 'other value' }
          if (typeof key === 'string') {
            return {
              [key]: storageState[key]
            }
          }
        })

        expect(await getStoredSettings()).toBeUndefined()
      })
    })
  })
})
