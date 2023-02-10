import BaseSelect from './BaseSelect.vue'
import { mount } from '@vue/test-utils'

describe('BaseSelect', () => {
  const options = [
    { value: '10', text: 'Ten' },
    { value: '20', text: 'Twenty' }
  ]

  interface FactoryProps {
    modelValue?: string
  }
  const factory = ({ modelValue = '' }: FactoryProps = {}) => {
    const wrapper = mount(BaseSelect, {
      props: { modelValue, options }
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
        expect(select.find(`option[value="${value}"]`).text()).toBe(text)
      })
    })
  })

  it('should set selected value from "value" prop', () => {
    const modelValue = '20'
    const { select } = factory({ modelValue })

    expect(select.element.value).toBe(modelValue)
  })

  describe('when an option is selected', () => {
    it('should emit "update:modelValue"', () => {
      const modelValue = '20'
      const { wrapper, select } = factory({ modelValue })

      select.setValue(modelValue)

      expect(wrapper.emitted('update:modelValue')).toEqual([[modelValue]])
    })
  })
})
