import BaseButton from './BaseButton.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('BaseButton', () => {
  it('should render a button', () => {
    const wrapper = mount(BaseButton)

    expect(wrapper.find('[data-test-id=button]').exists()).toBe(true)
  })

  it('should default slot content', () => {
    const text = 'Button text'
    const wrapper = mount(BaseButton, {
      slots: {
        default: text
      }
    })

    expect(wrapper.text()).toBe(text)
  })

  describe('fallthrough', () => {
    it('should allow event listeners fallthrough', async () => {
      const onClick = vi.fn()
      const wrapper = mount(BaseButton, {
        listeners: {
          click: onClick
        }
      })

      await wrapper.find('[data-test-id=button]').trigger('click')
      console.log(wrapper.vm.$attrs)

      expect(onClick).toHaveBeenCalled()
    })
  })
})
