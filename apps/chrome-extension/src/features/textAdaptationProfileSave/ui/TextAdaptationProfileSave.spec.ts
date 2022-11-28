import { mount } from '@vue/test-utils'
import TextAdaptationProfileSave from './TextAdaptationProfileSave.vue'

describe('TextAdaptationProfileSave', () => {
  it('should render a button', () => {
    const wrapper = mount(TextAdaptationProfileSave)

    expect(wrapper.find('[data-test-id=button]').exists()).toBe(true)
  })
})
