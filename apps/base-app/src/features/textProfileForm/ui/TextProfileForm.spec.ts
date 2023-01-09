import { shallowMount, type Wrapper } from '@vue/test-utils'
import TextProfileForm from './TextProfileForm.vue'
import { textSettingsFixture as settings } from '@/entities/textPreferences'
import type { ColoredItem } from '@readapt/settings'

describe('TextProfileForm', () => {
  const factory = () => {
    const wrapper = shallowMount(TextProfileForm, {
      propsData: {
        settings
      }
    })
    const tabs = wrapper.find('[data-test-id=tabs]')

    return { wrapper, tabs }
  }

  describe('tabs', () => {
    const expectTabRendered = (wrapper: Wrapper<TextProfileForm>, expectedTabTestId: string) => {
      ;['general', 'phoneme', 'letter'].forEach((tabTestId) => {
        expect(wrapper.find(`[data-test-id=${tabTestId}]`).exists()).toBe(expectedTabTestId === tabTestId)
      })
    }

    it('should render tab names', () => {
      const { tabs } = factory()

      expect(tabs.props('names')).toEqual(['SETTINGS.GENERAL_SETTINGS', 'SETTINGS.PHONEME_SETTINGS', 'SETTINGS.LETTER_SETTINGS'])
    })

    describe('when initially rendered', () => {
      it('should initially select the first tab', () => {
        const { wrapper } = factory()

        expectTabRendered(wrapper, 'general')
      })
    })

    describe('when changing the active tab', () => {
      const cases = [
        { tabIndex: 0, tabTestId: 'general' },
        { tabIndex: 1, tabTestId: 'phonemes' },
        { tabIndex: 2, tabTestId: 'letters' }
      ]
      it.each(cases)('should show $tabTestId tab', async ({ tabTestId, tabIndex }) => {
        const { tabs, wrapper } = factory()

        await tabs.vm.$emit('input', tabIndex)

        expectTabRendered(wrapper, tabTestId)
      })
    })
  })

  describe('general settings', () => {
    describe('on settings update', () => {
      it('should emit "update-settings"', () => {
        const { wrapper } = factory()

        const updateEvent = { key: 'fontSize', value: '140%' }
        wrapper.find('[data-test-id=general]').vm.$emit('update', updateEvent)

        expect(wrapper.emitted('update-settings')).toEqual([[updateEvent]])
      })
    })

    describe('on language update', () => {
      it('should emit "change-language"', () => {
        const { wrapper } = factory()

        const changeLanguageEvent = 'FR'
        wrapper.find('[data-test-id=general]').vm.$emit('change-language', changeLanguageEvent)

        expect(wrapper.emitted('change-language')).toEqual([[changeLanguageEvent]])
      })
    })
  })

  describe('phonemes settings', () => {
    describe('on phonemes update', () => {
      it('should emit "update-settings"', async () => {
        const { wrapper, tabs } = factory()

        await tabs.vm.$emit('input', 1)

        const phonemes: ColoredItem[] = [{ active: false, bold: true, key: '7', value: 'b' }]
        wrapper.find('[data-test-id=phonemes]').vm.$emit('update-items', phonemes)

        expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'phonemes', value: phonemes }]])
      })

      describe('on phonemes active update', () => {
        it('should emit "update-settings"', async () => {
          const { wrapper, tabs } = factory()

          await tabs.vm.$emit('input', 1)

          const phonemesActive = true
          wrapper.find('[data-test-id=phonemes]').vm.$emit('update-active', phonemesActive)

          expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'phonemesActive', value: phonemesActive }]])
        })
      })
    })
  })

  describe('letters settings', () => {
    describe('on letters update', () => {
      it('should emit "update-settings"', async () => {
        const { wrapper, tabs } = factory()

        await tabs.vm.$emit('input', 2)

        const letters: ColoredItem[] = [{ active: false, bold: true, key: '7', value: 'b' }]
        wrapper.find('[data-test-id=letters]').vm.$emit('update-items', letters)

        expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'letters', value: letters }]])
      })

      describe('on letters active update', () => {
        it('should emit "update-settings"', async () => {
          const { wrapper, tabs } = factory()

          await tabs.vm.$emit('input', 2)

          const lettersActive = true
          wrapper.find('[data-test-id=letters]').vm.$emit('update-active', lettersActive)

          expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'lettersActive', value: lettersActive }]])
        })
      })
    })
  })
})
