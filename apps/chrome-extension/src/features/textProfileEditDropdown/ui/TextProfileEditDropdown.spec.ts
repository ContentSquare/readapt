import TextProfileEditDropdown from './TextProfileEditDropdown.vue'
import { mount } from '@vue/test-utils'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { TextProfileId, TextSettings } from '@/entities/textPreferences/model/TextPreferences'
import {  } from 'module';

describe('TextProfileEditDropdown', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  interface FactoryProps {
    profileId: TextProfileId | null
    settings: TextSettings
  }

  const factory = ({ profileId, settings }: FactoryProps) => {
    useTextPreferences().setProfiles([profile])
    const wrapper = mount(TextProfileEditDropdown, {
      propsData: {
        value: profileId,
        settings
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  describe('profiles dropdown', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory({ profileId: null, settings: profile.settings })

      expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
    })

    it('should render new profile as option', () => {
      const { dropdown } = factory({ profileId: null, settings: profile.settings })

      expect(dropdown.find('option[value=""]').text()).toBe('New Profile')
    })
  })

  describe('v-model binding', () => {
    it('should select a profile using "value" as profile id', () => {
      const { dropdown } = factory({ profileId: profile.id, settings: profile.settings })

      expect(dropdown.element.value).toBe(profile.id.toString())
    })

    describe('when an existing profile option is selected', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, dropdown } = factory({ profileId: null, settings: profile.settings })

        dropdown.setValue(profile.id)

        expect(wrapper.emitted('input')).toEqual([[profile.id]])
      })
    })

    describe('when a new profile option is selected', () => {
      it('should trigger "input" with undefined', () => {
        const { wrapper, dropdown } = factory({ profileId: profile.id, settings: profile.settings })

        dropdown.setValue('')

        expect(wrapper.emitted('input')).toEqual([[null]])
      })
    })

    describe('when changing selection with unsaved changes', () => {
      it('should open a confirmation dialog', () => {
        const { wrapper, dropdown } = factory({ profileId: profile.id, settings: profile.settings })

        wrapper.setProps({
          settings: {
            ...profile.settings,
            fontFamily: 'OpenDyslexic'
          }
        })
        dropdown.setValue(null)


      })
    })
  })
})
