import { decodeSettings, encodeSettings, Settings } from '../src'

describe('SettingsCode', () => {
  test('should encode and decode settings', () => {
    const settings: Settings = { language: 'en', fontSize: '140%', phonemesActive: false } as Settings
    const code = encodeSettings(settings)
    expect(decodeSettings(code)).toEqual(settings)
  })
})
