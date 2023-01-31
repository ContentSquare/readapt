import BaseSelect from './BaseSelect.vue'
import { mount } from '@vue/test-utils'

describe('BaseButton', () => {
  const options = [
    { value: '10', text: 'Ten' },
    { value: '20', text: 'Twenty' }
  ]
  interface FactoryProps {
    value?: string
  }
  const factory = ({ value = '' }: FactoryProps = {}) => {
    const wrapper = mount(BaseSelect, {
      props: { value, options }
    })
    const select = wrapper.find<HTMLSelectElement>('select')

    return { wrapper, select }
  }

  it('should render a select element', () => {
    const { select } = factory()

    expect(select.exists()).toBe(true)
  })

  describe('options', () => {
    it('should render options', () => {
      const { select } = factory()

      options.forEach(({ value, text }) => {
        expect(select.find(`option[value=${value}]`).text()).toBe(text)
      })
    })
  })

  it('should set selected value from "value" prop', () => {
    const value = '20'
    const { select } = factory({ value })

    expect(select.element.value).toBe(value)
  })

  describe('when an option is selected', () => {
    it('should emit "input"', () => {
      const value = '20'
      const { wrapper, select } = factory({ value })

      select.setValue(value)

      expect(wrapper.emitted('input')).toEqual([[value]])
    })
  })
})
