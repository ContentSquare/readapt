import { mount } from '@vue/test-utils'
import TextAdaptationProfileSave from './TextAdaptationProfileSave.vue'

describe('TextAdaptationProfileSave', () => {
  describe('when save button is clicked', () => {
    describe('when the edited profile is new', () => {
      it('should create a new profile', async () => {
        const wrapper = mount(TextAdaptationProfileSave)

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(wrapper.emitted('save')).toBeTruthy()
      })
    })
  })

  // it('should render a button', () => {
  //   const wrapper = mount(TextAdaptationProfileSave)

  //   expect(wrapper.find('[data-test-id=button]').exists()).toBe(true)
  // })
})
