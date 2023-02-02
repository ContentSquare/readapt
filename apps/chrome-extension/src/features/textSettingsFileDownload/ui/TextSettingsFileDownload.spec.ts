import { mount } from '@vue/test-utils'
import TextSettingsFileDownload from './TextSettingsFileDownload.vue'
import { textSettingsFixture as settings } from '@/entities/textPreferences'

describe('TextSettingsFileDownload', () => {
  it('should render an anchor', () => {
    const wrapper = mount(TextSettingsFileDownload, {
      props: {
        settings
      },
      mocks: {
        $t: (v: string) => v
      }
    })

    expect(wrapper.find('[data-test-id=anchor]').exists()).toBe(true)
  })

  // TODO: unit test the JSON file creation
})
