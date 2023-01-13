import { shallowMount } from '@vue/test-utils'
import TextProfileCreateFromTemplate from './TextProfileCreateFromTemplate.vue'

describe('TextProfileCreateFromTemplate', () => {
  it('should render a div', () => {
    const wrapper = shallowMount(TextProfileCreateFromTemplate)

    expect(wrapper.find('div').exists()).toBe(true)
  })
})
