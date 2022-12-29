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

      expect(wrapper.find('[data-test-id=button]').classes()).contain(className)
    })
  })

  describe('variants', () => {
    const cases = [
      {
        variant: undefined,
        classes: 'text-white bg-primary-base'
      },
      {
        variant: 'primary',
        classes: 'text-white bg-primary-base'
      },
      {
        variant: 'secondary',
        classes: 'text-primary-base bg-white border-1 border-primary-base'
      }
    ]
    it.each(cases)('shoud support $variant variant', ({ variant, classes }) => {
      const wrapper = mount(BaseButton, {
        propsData: {
          variant
        }
      })

      const currentClasses = wrapper.find('[data-test-id=button]').classes()
      for (const className of classes.split(' ')) {
        expect(currentClasses).toContain(className)
      }
    })
  })
})
