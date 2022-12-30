import BaseDropown from './BaseDropdown.vue'
import { mount } from '@vue/test-utils'

describe('BaseButton', () => {
  it('should render a select element', () => {
    const wrapper = mount(BaseDropown)

    expect(wrapper.find('select[data-test-id=dropdown]').exists()).toBe(true)
  })

  it('should default slot content', () => {
    const wrapper = mount(BaseDropown, {
      slots: {
        default: `<option data-test-id="option">Some option</option>`
      }
    })

    expect(wrapper.find('[data-test-id=option]').exists()).toBe(true)
  })

  describe('fallthrough', () => {
    it('should allow event listeners fallthrough', async () => {
      const onClick = vi.fn()
      const wrapper = mount(BaseDropown, {
        listeners: {
          click: onClick
        }
      })

      await wrapper.find('[data-test-id=dropdown]').trigger('click')

      expect(onClick).toHaveBeenCalled()
    })

    it('should allow class fallthrough', () => {
      const className = 'm-5'
      const wrapper = mount(BaseDropown, {
        attrs: {
          class: className
        }
      })

      const attributes = wrapper.find('[data-test-id=dropdown]').attributes()

      expect(attributes.class).toContain(className)
    })
  })
})
