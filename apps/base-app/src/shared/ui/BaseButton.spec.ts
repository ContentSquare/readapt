import BaseButton from './BaseButton.vue'
import { mount } from '@vue/test-utils'

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

      expect(onClick).toHaveBeenCalled()
    })

    it('should allow class fallthrough', () => {
      const className = 'm-5'
      const wrapper = mount(BaseButton, {
        attrs: {
          class: className
        }
      })

      const attributes = wrapper.find('[data-test-id=button]').attributes()

      expect(attributes.class).toContain(className)
    })
  })

  describe('variants', () => {
    const primaryEnabledClass = 'text-white bg-primary-base hover:bg-primary-darker-10 active:bg-primary-darker-30'
    const primaryDisabledClass = 'text-white bg-primary-lighter-20'

    it('shoud support primary variant', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          variant: 'primary'
        }
      })

      const attributes = wrapper.find('[data-test-id=button]').attributes()

      expect(attributes.class).toContain(primaryEnabledClass)
    })

    it('should support disabled primary variant', () => {
      const wrapper = mount(BaseButton, {
        propsData: {
          variant: 'primary',
          disabled: true
        }
      })

      const attributes = wrapper.find('[data-test-id=button]').attributes()

      expect(attributes.class).toContain(primaryDisabledClass)
      expect(attributes.disabled).toBe('disabled')
    })

    it('should default to enabled primary variant', () => {
      const wrapper = mount(BaseButton)

      const attributes = wrapper.find('[data-test-id=button]').attributes()

      expect(attributes.class).toContain(primaryEnabledClass)
      expect(attributes.disabled).toBeUndefined()
    })
  })
})
