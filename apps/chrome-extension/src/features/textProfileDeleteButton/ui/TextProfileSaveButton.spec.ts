import { mount } from '@vue/test-utils'
import TextProfileSave from './TextProfileSaveButton.vue'
import { textSettingsFixture as settings, textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextProfileDeleteButton', () => {
  afterEach(() => {
    useTextPreferences().reset()
    jest.restoreAllMocks()
  })
})
