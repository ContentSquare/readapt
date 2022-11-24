import TextAdaptationProfilesDropdown from './TextAdaptationProfilesDropdown.vue'
import { mount } from '@vue/test-utils'

describe('TextAdaptationProfilesDropdown.vue', () => {
  const profiles = [
    {
      id: 'profile-1',
      name: 'Profile 1'
    },
    {
      id: 'profile-2',
      name: 'Profile 2'
    }
  ]
  const profileId = profiles[0].id

  const factory = (profileId = '') => {
    const wrapper = mount(TextAdaptationProfilesDropdown, {
      propsData: {
        profiles,
        value: profileId
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  describe('profiles dropdown', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory()

      for (const { name, id } of profiles) {
        expect(dropdown.find(`[value="${id}"]`).text()).toBe(name)
      }
    })

    it('should render new profile as option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('New Profile')
    })
  })

  describe('v-model binding', () => {
    it('should select a profile using "value" as profile id', () => {
      const { dropdown } = factory(profileId)

      expect(dropdown.element.value).toBe(profileId)
    })

    describe('when a profile is selected', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, dropdown } = factory()

        dropdown.setValue(profileId)

        expect(wrapper.emitted('input')).toEqual([[profileId]])
      })
    })
  })
})
