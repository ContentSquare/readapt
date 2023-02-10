import { mount } from '@vue/test-utils'
import SelectPercentage from './SelectPercentage.vue'

describe('SelectPercentage', () => {
  const factory = ({ modelValue }: { modelValue: string }) => {
    const wrapper = mount(SelectPercentage, {
      props: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        modelValue
      }
    })
    const minusButton = wrapper.find('[data-test-id="btn-minus"]')
    const plusButton = wrapper.find('[data-test-id="btn-plus"]')

    return { wrapper, minusButton, plusButton }
  }

  it('should select currentValue', () => {
    const { wrapper } = factory({ modelValue: '2' })

    expect(wrapper.find('[data-test-id=value]').text()).toBe('option-two')
  })

  describe('when "value" does not exist in options', () => {
    it('should select first option', () => {
      const { wrapper } = factory({ modelValue: '4' })

      expect(wrapper.find('[data-test-id=value]').text()).toBe('option-one')
    })
  })

  describe('minus button', () => {
    describe('when clicked', () => {
      it('should emit "update:modelValue" with the previous option', async () => {
        const { wrapper, minusButton } = factory({ modelValue: '3' })

        await minusButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([['2']])
      })
    })

    describe('when does not have less options', () => {
      it('should be disabled', () => {
        const { minusButton } = factory({ modelValue: '1' })

        const classes = minusButton.classes()
        expect(classes).toContain('bg-transparent')
        expect(classes).toContain('btn-disabled')
      })

      it('should not emit "update:modelValue"', async () => {
        const { wrapper, minusButton } = factory({ modelValue: '1' })

        await minusButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })

  describe('plus button', () => {
    describe('when clicked', () => {
      it('should emit "update:modelValue" with the next option', async () => {
        const { wrapper, plusButton } = factory({ modelValue: '1' })

        await plusButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toEqual([['2']])
      })
    })

    describe('when does not have more options', () => {
      it('should be disabled', () => {
        const { plusButton } = factory({ modelValue: '3' })

        const classes = plusButton.classes()
        expect(classes).toContain('bg-transparent')
        expect(classes).toContain('btn-disabled')
      })

      it('should not emit "update:modelValue"', async () => {
        const { wrapper, plusButton } = factory({ modelValue: '3' })

        await plusButton.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      })
    })
  })
})
