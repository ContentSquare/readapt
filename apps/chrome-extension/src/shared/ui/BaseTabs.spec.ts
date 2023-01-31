import { mount } from '@vue/test-utils'
import BaseTabs from './BaseTabs.vue'

describe('BaseTabs', () => {
  const factory = () => {
    const names = ['Tab 1', 'Tab 2']
    const wrapper = mount(BaseTabs, {
      props: {
        names,
        value: 1
      }
    })
    const tabs = wrapper.findAll('[data-test-id=tab]')

    return { wrapper, tabs, names }
  }

  describe('when initially rendered', () => {
    it('should render tab names', () => {
      const { tabs, names } = factory()

      expect(tabs.at(0).text()).toBe(names[0])
      expect(tabs.at(1).text()).toBe(names[1])
    })

    it('should mark a tab selected from "value" prop', () => {
      const { tabs } = factory()

      expect(tabs.at(0).classes()).not.toContain('tab-active')
      expect(tabs.at(1).classes()).toContain('tab-active')
    })

    it('should not emit "input"', () => {
      const { wrapper } = factory()

      expect(wrapper.emitted('input')).toBeUndefined()
    })
  })

  describe('when a tab is clicked', () => {
    it('should emit "input"', async () => {
      const { wrapper, tabs } = factory()

      await tabs.at(0).trigger('click')

      expect(wrapper.emitted('input')).toEqual([[0]])
    })
  })
})
