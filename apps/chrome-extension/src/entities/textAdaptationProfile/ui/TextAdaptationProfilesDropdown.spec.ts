import TextAdaptationSettingsDropdown from './TextAdaptationProfilesDropdown.vue'
import { mount } from '@vue/test-utils'

describe('TextAdaptationProfilesDropdown.vue', () => {
  it('should render a dropdown with options', () => {
    const options = ['option 1', 'option 2']
    const wrapper = mount(TextAdaptationSettingsDropdown, {
      propsData: {
        options
      }
    })

    const dropdown = wrapper.find('[data-test-id=dropdown]')

    const optionWrappers = dropdown.findAll('option')
    options.forEach((option, index) => {
      expect(optionWrappers.at(index).text()).toEqual(option)
    })
  })
})
