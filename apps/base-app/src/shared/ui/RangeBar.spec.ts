import { mount } from '@vue/test-utils'
import RangeBar from './RangeBar.vue'
import type { Option } from '@readapt/settings'

describe('RangeBar', () => {
  const factory = (propsData: { steps?: boolean } = {}) => {
    const options: Option<string>[] = [
      { value: '10', text: 'Ten' },
      { value: '20', text: 'Twenty' },
      { value: '30', text: 'Thirty' }
    ]

    const wrapper = mount(RangeBar, {
      propsData: {
        options,
        value: '20',
        ...propsData
      }
    })
    const input = wrapper.find<HTMLInputElement>('input')

    return { wrapper, input }
  }

  it('should render a range input', () => {
    const { input } = factory()

    expect(input.attributes('type')).toBe('range')
  })

  describe('when initially rendered', () => {
    it('should set range min, max and value', () => {
      const { input } = factory()

      expect(input.attributes('min')).toBe('1')
      expect(input.attributes('max')).toBe('3')
      expect(input.element.value).toBe('2')
    })

    it('should not emit "change" event', () => {
      it('should emit "change" event', () => {
        const { wrapper } = factory()

        expect(wrapper.emitted('change')).toBeUndefined()
      })
    })
  })

  describe('when range value changes', () => {
    it('should emit "change" event', async () => {
      const { wrapper, input } = factory()

      await input.setValue('1')

      expect(wrapper.emitted('change')).toEqual([['10']])
    })
  })

  describe('steps', () => {
    describe('when steps is enabled', () => {
      it.each([true, undefined])('should render the steps', (steps) => {
        const { wrapper } = factory({ steps })

        expect(wrapper.findAll('span')).toHaveLength(3)
      })
    })

    describe('when steps is disabled', () => {
      it('should not render the steps', () => {
        const { wrapper } = factory({ steps: false })

        expect(wrapper.findAll('span')).toHaveLength(0)
      })
    })
  })
})
