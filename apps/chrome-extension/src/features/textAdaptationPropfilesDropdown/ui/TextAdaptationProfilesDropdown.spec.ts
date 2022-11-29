import TextAdaptationProfilesDropdown from './TextAdaptationProfilesDropdown.vue'
import { mount } from '@vue/test-utils'
import { TextAdaptationPreferencesFixtures, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'
import { TextAdaptationProfileId } from '@/entities/textAdaptationPreferences/model/Preferences'

describe('TextAdaptationProfilesDropdown.vue', () => {
  const { profile } = TextAdaptationPreferencesFixtures

  beforeEach(() => {
    useTextAdaptationPreferences().createProfile(profile)
  })

  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  const factory = (profileId: TextAdaptationProfileId | null = null) => {
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

      expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
    })

    it('should render new profile as option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('New Profile')
    })
  })

  describe('v-model binding', () => {
    it('should select a profile using "value" as profile id', () => {
      const { dropdown } = factory(profile.id)

      expect(dropdown.element.value).toBe(profile.id.toString())
    })

    describe('when a profile is selected', () => {
      it('should trigger "input" with selected profile id', () => {
        const { wrapper, dropdown } = factory()

        dropdown.setValue(profile.id)

        expect(wrapper.emitted('input')).toEqual([[profile.id]])
      })
    })

    describe('when a new profile option is selected', () => {
      it('should trigger "input" with undefined', () => {
        const { wrapper, dropdown } = factory(profile.id)

        dropdown.setValue('')

        expect(wrapper.emitted('input')).toEqual([[undefined]])
      })
    })
  })
})
