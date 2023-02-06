import { mount } from '@vue/test-utils'
import SvgIcon from './SvgIcon.vue'

describe('SvgIcon', () => {
  it('should render an "edit" icon', () => {
    const wrapper = mount(SvgIcon, {
      props: {
        id: 'edit'
      }
    })

    const use = wrapper.find('[data-test-id=icon] use')

    const href = '/icons/fragments.svg#edit'
    expect(use.attributes('href')).toBe(href)
    expect(use.attributes('href')).toBe(href)
  })

  it('should allow class fallthrough', () => {
    const className = 'm-5'
    const wrapper = mount(SvgIcon, {
      attrs: {
        id: 'edit',
        class: className
      }
    })

    expect(wrapper.find('[data-test-id=icon]').classes()).toContain(className)
  })
})
