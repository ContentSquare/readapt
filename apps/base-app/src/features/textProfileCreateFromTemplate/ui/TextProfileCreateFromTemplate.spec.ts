import { shallowMount } from '@vue/test-utils'
import type { TextSettingsTemplate } from '@/entities/textSettingsTemplate'
import TextProfileCreateFromTemplate from './TextProfileCreateFromTemplate.vue'

describe('TextProfileCreateFromTemplate', () => {
  const templates: TextSettingsTemplate[] = it('should render a div', () => {
    const wrapper = shallowMount(TextProfileCreateFromTemplate)

    expect(wrapper.find('div').exists()).toBe(true)
  })
})
