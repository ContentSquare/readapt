import { mount } from '@vue/test-utils'
import PreviewContainer from '../../src/components/adapt/PreviewContainer.vue'

describe('PreviewContainer', () => {
  test('should show contentToAdapt value by default', async () => {
    const contentToAdapt = 'a very simple text'
    const wrapper = mount(PreviewContainer, {
      propsData: {
        contentToAdapt
      }
    })

    await wrapper.vm.$nextTick()

    const adaptContainer = wrapper.find('.adapt-container').element
    expect(adaptContainer.textContent).toBe(contentToAdapt)
  })

  test('should not show textArea', async () => {
    const contentToAdapt = 'a very simple text'
    const wrapper = mount(PreviewContainer, {
      propsData: {
        contentToAdapt
      }
    })

    await wrapper.vm.$nextTick()

    const textArea = wrapper.find('textarea')
    expect(textArea.element.hasAttribute('hidden')).toBeTruthy()
  })

  test('should show textArea on click', async () => {
    const contentToAdapt = 'a very simple text'
    const wrapper = mount(PreviewContainer, {
      propsData: {
        contentToAdapt
      }
    })

    await wrapper.vm.$nextTick()

    const adaptContainer = wrapper.find('.adapt-container')
    adaptContainer.trigger('click')
    await wrapper.vm.$nextTick()

    const textArea = wrapper.find('textarea')
    expect(textArea.element.hasAttribute('hidden')).toBeFalsy()
    expect((textArea.element as HTMLTextAreaElement).value).toBe(contentToAdapt)
  })

  test('should show emit update on textArea on blur', async () => {
    const contentToAdapt = 'a very simple text'
    const updateFn = jest.fn()

    const wrapper = mount(PreviewContainer, {
      propsData: {
        contentToAdapt
      },
      listeners: { update: updateFn }
    })

    await wrapper.vm.$nextTick()

    const adaptContainer = wrapper.find('.adapt-container')
    adaptContainer.trigger('click')
    await wrapper.vm.$nextTick()

    const textArea = wrapper.find('textarea')
    const newTextValue = 'new text value'
    const textAreaElem = textArea.element as HTMLTextAreaElement
    textAreaElem.value = newTextValue
    textArea.trigger('blur')
    await wrapper.vm.$nextTick()

    expect((textArea.element as HTMLTextAreaElement).value).toBe(contentToAdapt)
    expect(updateFn).toBeCalledWith(newTextValue)
  })

  test('should not emit update on textArea when the value is empty', async () => {
    const contentToAdapt = 'a very simple text'
    const updateFn = jest.fn()

    const wrapper = mount(PreviewContainer, {
      propsData: {
        contentToAdapt
      },
      listeners: { update: updateFn }
    })

    await wrapper.vm.$nextTick()

    const adaptContainer = wrapper.find('.adapt-container')
    adaptContainer.trigger('click')
    await wrapper.vm.$nextTick()

    const textArea = wrapper.find('textarea')
    const newTextValue = '\t  \n'
    const textAreaElem = textArea.element as HTMLTextAreaElement
    textAreaElem.value = newTextValue
    textArea.trigger('blur')
    await wrapper.vm.$nextTick()

    expect((textArea.element as HTMLTextAreaElement).value).toBe(contentToAdapt)
    expect(updateFn).toBeCalledTimes(0)
  })
})
