import { mount } from '@vue/test-utils'

import SelectPercentage from '@/components/forms/SelectPercentage.vue'

describe('SelectPercentage', () => {
  test('should select currentValue', async () => {
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '2'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.currentValue).toBe('option-two')
    const btnMinus = wrapper.find('[data-test-id="btn-minus"]')
    expect(btnMinus.classes('disabled')).toBeFalsy()
    const btnPlus = wrapper.find('[data-test-id="btn-plus"]')
    expect(btnPlus.classes('disabled')).toBeFalsy()
  })

  test('should select first value if props value do not exists', async () => {
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '4'
      }
    })
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$data.currentValue).toBe('option-one')
  })

  test('should disable minus button if has not less options', async () => {
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '1'
      }
    })
    await wrapper.vm.$nextTick()

    const btnMinus = wrapper.find('[data-test-id="btn-minus"]')
    expect(btnMinus.classes('disabled')).toBeTruthy()
  })

  test('should disable plus button if has not more options', async () => {
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '3'
      }
    })
    await wrapper.vm.$nextTick()

    const btnPlus = wrapper.find('[data-test-id="btn-plus"]')
    expect(btnPlus.classes('disabled')).toBeTruthy()
  })

  test('should emit next option if plus button is clicked', async () => {
    const changeFn = jest.fn()
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '1'
      },
      listeners: { change: changeFn }
    })
    await wrapper.vm.$nextTick()

    wrapper.find('[data-test-id="btn-plus"]').trigger('click')
    expect(changeFn).toBeCalledWith('2')
  })

  test('should not emit next option if plus button is disabled', async () => {
    const changeFn = jest.fn()
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '3'
      },
      listeners: { change: changeFn }
    })
    await wrapper.vm.$nextTick()

    wrapper.find('[data-test-id="btn-plus"]').trigger('click')
    expect(changeFn).toBeCalledTimes(0)
  })

  test('should emit next option if minus button is clicked', async () => {
    const changeFn = jest.fn()
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '3'
      },
      listeners: { change: changeFn }
    })
    await wrapper.vm.$nextTick()

    wrapper.find('[data-test-id="btn-minus"]').trigger('click')
    expect(changeFn).toBeCalledWith('2')
  })

  test('should not emit next option if plus button is disabled', async () => {
    const changeFn = jest.fn()
    const wrapper = mount(SelectPercentage, {
      propsData: {
        options: [
          { value: '1', text: 'option-one' },
          { value: '2', text: 'option-two' },
          { value: '3', text: 'option-three' }
        ],
        value: '1'
      },
      listeners: { change: changeFn }
    })
    await wrapper.vm.$nextTick()

    wrapper.find('[data-test-id="btn-minus"]').trigger('click')
    expect(changeFn).toBeCalledTimes(0)
  })
})
