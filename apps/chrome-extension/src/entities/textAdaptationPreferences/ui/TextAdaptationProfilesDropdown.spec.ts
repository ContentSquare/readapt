import TextAdaptationProfilesDropdown from './TextAdaptationProfilesDropdown.vue'
import { mount } from '@vue/test-utils'
import { profiles } from '../model/preferencesFixtures'
import { useTextAdaptationPreferences } from '../model/state/usePreferences'

describe('TextAdaptationProfilesDropdown.vue', () => {
  beforeEach(() => {
    useTextAdaptationPreferences().addProfile(profiles)
  })

  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  const factory = (profileId = '') => {
    const wrapper = mount(TextAdaptationProfilesDropdown, {
      propsData: {
        value: profileId
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  describe('profiles dropdown', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory()

      expect(dropdown.find(`[value="${profiles.id}"]`).text()).toBe(profiles.name)
    })

    it('should render new profile as option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('New Profile')
    })
  })

  describe('v-model binding', () => {
    it('should select a profile using "value" as profile id', () => {
      const { dropdown } = factory(profiles.id)

      expect(dropdown.element.value).toBe(profiles.id)
    })

    describe('when a profile is selected', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, dropdown } = factory()

        dropdown.setValue(profiles.id)

        expect(wrapper.emitted('input')).toEqual([[profiles.id]])
      })
    })
  })
})
