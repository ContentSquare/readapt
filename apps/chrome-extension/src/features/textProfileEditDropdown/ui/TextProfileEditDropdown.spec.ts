import TextProfileEditDropdown from './TextProfileEditDropdown.vue'
import { mount } from '@vue/test-utils'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { TextProfileId } from '@/entities/textPreferences/model/TextPreferences'

describe('TextProfileEditDropdown', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  const factory = (profileId: TextProfileId | null = null) => {
    useTextPreferences().setProfiles([profile])
    const wrapper = mount(TextProfileEditDropdown, {
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
