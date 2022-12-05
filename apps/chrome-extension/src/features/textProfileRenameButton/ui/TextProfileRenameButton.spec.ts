import { mount } from '@vue/test-utils'
import TextProfileRenameButton from './TextProfileRenameButton.vue'
import { textSettingsFixture as settings, textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextProfileRenameButton', () => {
  // afterEach(() => {
  //   useTextPreferences().reset()
  //   jest.restoreAllMocks()
  // })

  interface FactoryProps {}

  const factory = () => {}

  describe('when the profile is new', () => {
    it('should not render the button', () => {
      const wrapper = mount(TextProfileRenameButton, {
        propsData: {
          profileId: null
        }
      })

      expect(wrapper.find('[data-test-id=rename]').exists()).toBe(false)
    })
  })

  describe('when the profile exists', () => {
    it('should render the button', () => {
      const wrapper = mount(TextProfileRenameButton, {
        propsData: {
          profileId: profile.id
        }
      })

      expect(wrapper.find('[data-test-id=rename]').exists()).toBe(true)
    })
  })

  // describe('when clicking the button', () => {
  //   it('should show a pri')
  // })

  // it('should render a button', () => {})

  // describe('when the button is clicked', () => {
  //   it('should open a proble')
  // });
})
