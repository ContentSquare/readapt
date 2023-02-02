import { mount } from '@vue/test-utils'
import BaseTabs from './BaseTabs.vue'

describe('BaseTabs', () => {
  const factory = () => {
    const names = ['Tab 1', 'Tab 2']
    const wrapper = mount(BaseTabs, {
      props: {
        names,
        modelValue: 1
      }
    })
    const tabs = wrapper.findAll('[data-test-id=tab]')

    return { wrapper, tabs, names }
  }

  describe('when initially rendered', () => {
    it('should render tab names', () => {
      const { tabs, names } = factory()

      expect(tabs[0].text()).toBe(names[0])
      expect(tabs[1].text()).toBe(names[1])
    })

    it('should mark a tab selected from "value" prop', () => {
      const { tabs } = factory()

      expect(tabs[0].classes()).not.toContain('tab-active')
      expect(tabs[1].classes()).toContain('tab-active')
    })

    it('should not emit "update:modelValue"', () => {
      const { wrapper } = factory()

      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('when a tab is clicked', () => {
    it('should emit "update:modelValue"', async () => {
      const { wrapper, tabs } = factory()

      await tabs[0].trigger('click')

      expect(wrapper.emitted('update:modelValue')).toEqual([[0]])
    })
  })
})
