import { shallowMount } from '@vue/test-utils'
import TextProfileForm from './TextProfileForm.vue'
import { textSettingsFixture as settings } from '@/entities/textPreferences'
import type { ColoredItem } from '@readapt/settings'
import BaseTabs from '@/shared/ui/BaseTabs.vue'
import TextProfileFormGeneralTab from './TextProfileFormGeneralTab.vue'
import TextProfileFormItemsTab from './TextProfileFormItemsTab.vue'

describe('TextProfileForm', () => {
  const tabTestIds = ['general', 'phoneme', 'letter']

  const factory = () => {
    const wrapper = shallowMount(TextProfileForm, {
      props: {
        settings
      }
    })
    const tabs = wrapper.getComponent(BaseTabs)

    const expectTabRendered = (expectedTabTestId: string) => {
      tabTestIds.forEach((tabTestId) => {
        expect(wrapper.find(`[data-test-id=${tabTestId}]`).exists()).toBe(expectedTabTestId === tabTestId)
      })
    }

    return { wrapper, tabs, expectTabRendered }
  }

  describe('tabs', () => {
    it('should render tab names', () => {
      const { tabs } = factory()
      expect(tabs.props('names')).toEqual(['SETTINGS.GENERAL_SETTINGS', 'SETTINGS.PHONEME_SETTINGS', 'SETTINGS.LETTER_SETTINGS'])
    })

    describe('when initially rendered', () => {
      it('should initially select the first tab', () => {
        const { expectTabRendered } = factory()

        expectTabRendered('general')
      })
    })

    describe('when changing the active tab', () => {
      const cases = [
        { tabIndex: 0, tabTestId: 'general' },
        { tabIndex: 1, tabTestId: 'phonemes' },
        { tabIndex: 2, tabTestId: 'letters' }
      ]
      it.each(cases)('should show $tabTestId tab', async ({ tabTestId, tabIndex }) => {
        const { tabs, expectTabRendered } = factory()

        await tabs.vm.$emit('update:modelValue', tabIndex)

        expectTabRendered(tabTestId)
      })
    })
  })

  describe('general settings', () => {
    describe('on settings update', () => {
      it('should emit "update-settings"', () => {
        const { wrapper } = factory()

        const updateEvent = { key: 'fontSize', value: '140%' }
        wrapper.findComponent(TextProfileFormGeneralTab).vm.$emit('update', updateEvent)

        expect(wrapper.emitted('update-settings')).toEqual([[updateEvent]])
      })
    })

    describe('on language update', () => {
      it('should emit "change-language"', () => {
        const { wrapper } = factory()

        const changeLanguageEvent = 'fr'
        wrapper.findComponent(TextProfileFormGeneralTab).vm.$emit('change-language', changeLanguageEvent)

        expect(wrapper.emitted('change-language')).toEqual([[changeLanguageEvent]])
      })
    })
  })

  describe('phonemes settings', () => {
    describe('on phonemes update', () => {
      it('should emit "update-settings"', async () => {
        const { wrapper, tabs } = factory()

        await tabs.vm.$emit('update:modelValue', 1)

        const phonemes: ColoredItem[] = [{ active: false, bold: true, key: '7', value: 'b' }]
        wrapper.findComponent(TextProfileFormItemsTab).vm.$emit('update-items', phonemes)

        expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'phonemes', value: phonemes }]])
      })

      describe('on phonemes active update', () => {
        it('should emit "update-settings"', async () => {
          const { wrapper, tabs } = factory()

          await tabs.vm.$emit('update:modelValue', 1)

          const phonemesActive = true
          wrapper.findComponent(TextProfileFormItemsTab).vm.$emit('update-active', phonemesActive)

          expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'phonemesActive', value: phonemesActive }]])
        })
      })
    })
  })

  describe('letters settings', () => {
    describe('on letters update', () => {
      it('should emit "update-settings"', async () => {
        const { wrapper, tabs } = factory()

        await tabs.vm.$emit('update:modelValue', 2)

        const letters: ColoredItem[] = [{ active: false, bold: true, key: '7', value: 'b' }]
        wrapper.findComponent(TextProfileFormItemsTab).vm.$emit('update-items', letters)

        expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'letters', value: letters }]])
      })

      describe('on letters active update', () => {
        it('should emit "update-settings"', async () => {
          const { wrapper, tabs } = factory()

          await tabs.vm.$emit('update:modelValue', 2)

          const lettersActive = true
          wrapper.findComponent(TextProfileFormItemsTab).vm.$emit('update-active', lettersActive)

          expect(wrapper.emitted('update-settings')).toEqual([[{ key: 'lettersActive', value: lettersActive }]])
        })
      })
    })
  })
})
