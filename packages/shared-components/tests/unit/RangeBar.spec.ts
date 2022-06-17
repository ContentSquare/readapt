import { mount } from '@vue/test-utils'
import { BFormInput } from 'bootstrap-vue'

import RangeBar from '../../src/components/forms/RangeBar.vue'

describe('RangeBar', () => {
  test('should select currentValue', async () => {
    const wrapper = mount(RangeBar, {
      propsData: {
        options: [
          { value: 'one', text: '1' },
          { value: 'two', text: '2' },
          { value: 'three', text: '3' }
        ],
        value: 'two'
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.currentValue).toBe('2')
    expect(wrapper.vm.$data.max).toBe('3')
  })

  test('should select first value if props value do not exists', async () => {
    const wrapper = mount(RangeBar, {
      propsData: {
        options: [
          { value: 'one', text: '1' },
          { value: 'two', text: '2' },
          { value: 'three', text: '4' }
        ],
        value: 'unknown'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.currentValue).toBe('1')
  })

  test('should have input value same as currentValue', async () => {
    const wrapper = mount(RangeBar, {
      propsData: {
        options: [
          { value: 'aa', text: '1' },
          { value: 'bb', text: '2' },
          { value: 'cc', text: '3' }
        ],
        value: 'cc'
      }
    })
    await wrapper.vm.$nextTick()

    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.min).toBe('1')
    expect(input.max).toBe('3')
    expect(input.step).toBe('1')
    expect(input.value).toBe('3')
  })

  test('should emit value on value change', async () => {
    const changeFn = jest.fn()
    const wrapper = mount(RangeBar, {
      propsData: {
        options: [
          { value: 'aa', text: '1' },
          { value: 'bb', text: '2' },
          { value: 'cc', text: '3' }
        ],
        value: 'cc'
      },
      listeners: { change: changeFn }
    })
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input').element as HTMLInputElement
    input.value = '1'
    wrapper.findComponent(BFormInput).trigger('input')
    expect(changeFn).toBeCalledWith('aa')
  })
})
