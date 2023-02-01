import TextProfileEditDropdown from './TextProfileEditDropdown.vue'
import { mount } from '@vue/test-utils'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import type { TextProfileId, TextSettings } from '@/entities/textPreferences/model/TextPreferences'
import { mockConfirm } from '@/shared/test'

describe('TextProfileEditDropdown', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })
  afterEach(() => {
    useTextPreferences().reset()
  })

  interface FactoryProps {
    modelValue?: TextProfileId | null
    settings?: TextSettings
    confirmResult?: boolean
  }

  const factory = ({ modelValue = profile.id, settings = profile.settings, confirmResult = true }: FactoryProps = {}) => {
    mockConfirm(confirmResult)
    const wrapper = mount(TextProfileEditDropdown, {
      props: {
        modelValue,
        settings
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('select')
    const selectByProfileId = async (profileId: TextProfileId | null) => await dropdown.setValue(String(profileId ?? ''))

    return { wrapper, dropdown, selectByProfileId }
  }

  describe('options', () => {
    it('should render profiles options', () => {
      const { dropdown } = factory()

      expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
    })

    it('should render new profile option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('SETTINGS.PROFILE_NEW')
    })
  })

  describe('when changing selection with saved changes', () => {
    it('should select a profile using "value" prop', async () => {
      const { dropdown } = factory()

      expect(dropdown.element.value).toBe(profile.id.toString())
    })

    describe('when selecting an existing profile', () => {
      it('should trigger "update:modelValue" with selected profile id', () => {
        const { wrapper, selectByProfileId } = factory({ modelValue: null })

        selectByProfileId(profile.id)

        expect(wrapper.emitted('update:modelValue')).toEqual([[profile.id]])
      })
    })

    describe('when selecting a new profile', () => {
      it('should trigger "update:modelValue" with null', () => {
        const { wrapper, selectByProfileId } = factory()

        selectByProfileId(null)

        expect(wrapper.emitted('update:modelValue')).toEqual([[null]])
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
      const { selectByProfileId } = factory({ modelValue: profileId, settings: dirtySettings })

      await selectByProfileId(newProfileId)

      expect(confirm).toHaveBeenCalledWith('SETTINGS.PROFILE_UNSAVED_CHANGES')
    })

    describe('when user confirms the selection change', () => {
      it.each(cases)('should trigger "update:modelValue"', async ({ profileId, newProfileId }) => {
        const { wrapper, selectByProfileId } = factory({ modelValue: profileId, settings: dirtySettings })

        await selectByProfileId(newProfileId)

        expect(wrapper.emitted('update:modelValue')).toEqual([[newProfileId]])
      })
    })

    describe('when user cancels the selection change', () => {
      it.each(cases)('should not trigger "update:modelValue"', async ({ profileId, newProfileId }) => {
        const { wrapper, selectByProfileId } = factory({ modelValue: profileId, settings: dirtySettings })
        mockConfirm(false)

        await selectByProfileId(newProfileId)

        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      })

      it.each(cases)('should keep the selection', async ({ profileId, newProfileId }) => {
        const { dropdown, selectByProfileId } = factory({ modelValue: profileId, settings: dirtySettings })
        mockConfirm(false)

        await selectByProfileId(newProfileId)

        expect(dropdown.element.value).toBe(String(profileId ?? ''))
      })
    })
  })

  describe('when changing selection with saved changes', () => {
    it('should not open a confirmation dialog', async () => {
      const { selectByProfileId } = factory()

      await selectByProfileId(null)

      expect(confirm).not.toHaveBeenCalled()
    })
  })
})
