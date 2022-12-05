import TextProfileEditDropdown from './TextProfileEditDropdown.vue'
import { mount } from '@vue/test-utils'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { TextProfileId, TextSettings } from '@/entities/textPreferences/model/TextPreferences'
import { mockConfirm } from '@/shared/test'

describe('TextProfileEditDropdown', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })
  afterEach(() => {
    useTextPreferences().reset()
  })

  interface FactoryProps {
    value?: TextProfileId | null
    settings?: TextSettings
    confirmResult?: boolean
  }

  const factory = ({ value = profile.id, settings = profile.settings, confirmResult = true }: FactoryProps = {}) => {
    mockConfirm(confirmResult)
    const wrapper = mount(TextProfileEditDropdown, {
      propsData: {
        value,
        settings
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  describe('options', () => {
    it('should render profiles options', () => {
      const { dropdown } = factory()

      expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
    })

    it('should render new profile option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('New Profile')
    })
  })

  describe('when changing selection with saved changes', () => {
    it('should select a profile using "value" prop', () => {
      const { dropdown } = factory()

      expect(dropdown.element.value).toBe(profile.id.toString())
    })

    describe('when selecting an existing profile', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, dropdown } = factory({ value: null })

        dropdown.setValue(profile.id)

        expect(wrapper.emitted('input')).toEqual([[profile.id]])
      })
    })

    describe('when selecting a new profile', () => {
      it('should trigger "input" with null', () => {
        const { wrapper, dropdown } = factory()

        dropdown.setValue('')

        expect(wrapper.emitted('input')).toEqual([[null]])
      })
    })
  })

  describe('when selecting with unsaved changes', () => {
    const dirtySettings: TextSettings = { ...profile.settings, fontFamily: 'OpenDyslexic' }
    const cases = [
      { profileId: profile.id, newProfileId: null },
      { profileId: null, newProfileId: profile.id }
    ]

    it.each(cases)('should open a confirmation dialog', async ({ profileId, newProfileId }) => {
      const { dropdown } = factory({ value: profileId, settings: dirtySettings })

      await dropdown.setValue(newProfileId)

      expect(confirm).toHaveBeenCalled()
    })

    describe('when user confirms the selection change', () => {
      it.each(cases)('should trigger "input"', async ({ profileId, newProfileId }) => {
        const { wrapper, dropdown } = factory({ value: profileId, settings: dirtySettings })

        await dropdown.setValue(newProfileId)

        expect(wrapper.emitted('input')).toEqual([[newProfileId]])
      })
    })

    describe('when user cancels the selection change', () => {
      it.each(cases)('should not trigger "input"', async ({ profileId, newProfileId }) => {
        const { wrapper, dropdown } = factory({ value: profileId, settings: dirtySettings })
        mockConfirm(false)

        await dropdown.setValue(newProfileId)

        expect(wrapper.emitted('input')).toBeUndefined()
      })

      it.each(cases)('should keep the selection', async ({ profileId, newProfileId }) => {
        const { dropdown } = factory({ value: profileId, settings: dirtySettings })
        mockConfirm(false)

        await dropdown.setValue(newProfileId)

        expect(dropdown.element.value).toBe(String(profileId ?? ''))
      })
    })
  })

  describe('when changing selection with saved changes', () => {
    it('should not open a confirmation dialog', async () => {
      const { dropdown } = factory()

      await dropdown.setValue(null)

      expect(confirm).not.toHaveBeenCalled()
    })
  })
})
