import { mount } from '@vue/test-utils'
import ColorPicker from './ColorPicker.vue'
import { colors } from '@readapt/settings'

describe('ColorPicker', () => {
  const color = colors[0] as string

  const factory = ({ modelValue = color }: { modelValue?: string | null } = {}) => {
    const wrapper = mount(ColorPicker, {
      props: {
        modelValue
      }
    })
    const modal = wrapper.find('[data-test-id=modal]')
    const mainButton = wrapper.find('[data-test-id=main-button]')

    return { wrapper, mainButton, modal }
  }

  describe('when "value" is a color', () => {
    it('should color main button by "value" color', () => {
      const colorRgb = 'rgb(95, 162, 206)' // of #5fa2ce
      const { wrapper } = factory()

      const coloredIconElement = wrapper.find<HTMLDivElement>('[data-test-id=colored-icon]').element
      expect(coloredIconElement.style.backgroundColor).toBe(colorRgb)
    })
  })

  describe('when "value" is empty', () => {
    it('should show missing color icon', () => {
      const { wrapper } = factory({ modelValue: null })

      expect(wrapper.find('[data-test-id=missing-color-icon]').exists()).toBe(true)
    })
  })

  describe('modal', () => {
    describe('when initially rendered', () => {
      it('should keep the modal closed', () => {
        const { modal } = factory()

        expect(modal.classes()).not.toContain('modal-open')
      })
    })

    describe('when main button is clicked', () => {
      it('should open the modal', async () => {
        const { modal, mainButton } = factory()

        await mainButton.trigger('click')

        expect(modal.classes()).toContain('modal-open')
      })
    })

    describe('when selecting a color from modal', () => {
      it('should emit "selectColor" with the selected color', async () => {
        const { wrapper, modal, mainButton } = factory()

        await mainButton.trigger('click')
        await modal.findAll('[data-test-id=color-button]')[1].trigger('click')

        expect(wrapper.emitted('selectColor')).toEqual([[colors.at(1)]])
      })

      it('should close the modal', async () => {
        const { modal, mainButton } = factory()

        await mainButton.trigger('click')
        await modal.findAll('[data-test-id=color-button]')[1].trigger('click')

        expect(modal.classes()).not.toContain('modal-open')
      })
    })

    describe('when selecting missing color from modal', () => {
      it('should emit "selectColor" with an undefined', async () => {
        const { wrapper, modal, mainButton } = factory()

        await mainButton.trigger('click')
        await modal.find('[data-test-id=missing-color-button]').trigger('click')

        expect(wrapper.emitted('selectColor')).toEqual([[undefined]])
      })

      it('should close the modal', async () => {
        const { modal, mainButton } = factory()

        await mainButton.trigger('click')
        await modal.find('[data-test-id=missing-color-button]').trigger('click')

        expect(modal.classes()).not.toContain('modal-open')
      })
    })
  })
})
