import { mount } from '@vue/test-utils'
import TextProfileForm from './TextProfileForm.vue'
import { textSettingsFixture as settings } from '@/entities/textPreferences'

describe('TextProfileForm', () => {
  it('should render a div', () => {
    const wrapper = mount(TextProfileForm, {
      propsData: {
        activeIndex: 0,
        settings
      }
    })

    expect(wrapper.find('div').exists()).toBe(true)
  })
})
