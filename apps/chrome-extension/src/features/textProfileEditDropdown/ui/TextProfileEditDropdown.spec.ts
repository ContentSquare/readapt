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
    value?: TextProfileId | null
    settings?: TextSettings
    confirmResult?: boolean
  }

  const factory = ({ value = profile.id, settings = profile.settings, confirmResult = true }: FactoryProps = {}) => {
    mockConfirm(confirmResult)
    const wrapper = mount(TextProfileEditDropdown, {
      props: {
        value,
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
    it('should select a profile using "value" prop', () => {
      const { dropdown } = factory()

      expect(dropdown.element.value).toBe(profile.id.toString())
    })

    describe('when selecting an existing profile', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, selectByProfileId } = factory({ value: null })

        selectByProfileId(profile.id)

        expect(wrapper.emitted('input')).toEqual([[profile.id]])
      })
    })

    describe('when selecting a new profile', () => {
      it('should trigger "input" with null', () => {
        const { wrapper, selectByProfileId } = factory()

        selectByProfileId(null)

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
      const { selectByProfileId } = factory({ value: profileId, settings: dirtySettings })

      await selectByProfileId(newProfileId)

      expect(confirm).toHaveBeenCalledWith('SETTINGS.PROFILE_UNSAVED_CHANGES')
    })

    describe('when user confirms the selection change', () => {
      it.each(cases)('should trigger "input"', async ({ profileId, newProfileId }) => {
        const { wrapper, selectByProfileId } = factory({ value: profileId, settings: dirtySettings })

        await selectByProfileId(newProfileId)

        expect(wrapper.emitted('input')).toEqual([[newProfileId]])
      })
    })

    describe('when user cancels the selection change', () => {
      it.each(cases)('should not trigger "input"', async ({ profileId, newProfileId }) => {
        const { wrapper, selectByProfileId } = factory({ value: profileId, settings: dirtySettings })
        mockConfirm(false)

        await selectByProfileId(newProfileId)

        expect(wrapper.emitted('input')).toBeUndefined()
      })

      it.each(cases)('should keep the selection', async ({ profileId, newProfileId }) => {
        const { dropdown, selectByProfileId } = factory({ value: profileId, settings: dirtySettings })
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
