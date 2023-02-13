import { mount } from '@vue/test-utils'
import TextProfileActiveDropdownReadonly from './TextProfileActiveDropdownReadonly.vue'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'

describe('TextProfileActiveDropdownReadonly', () => {
  const profiles = [profile, { ...profile, id: 2, name: 'Other' }]
  beforeEach(() => {
    useTextPreferences().setProfiles(profiles)
  })

  afterEach(() => {
    useTextPreferences().reset()
  })

  const factory = () => {
    const { preferences, setActiveProfileId } = useTextPreferences()

    const wrapper = mount(TextProfileActiveDropdownReadonly, {
      props: {
        modelValue: profiles[1].id
      }
    })
    const dropdown = wrapper.find('select')

    return { wrapper, dropdown, preferences, setActiveProfileId }
  }

  describe('dropdown options', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory()

      for (const profile of profiles) {
        expect(dropdown.find(`option[value="${profile.id}"]`).text()).toBe(profile.name)
      }
    })
  })

  describe('selecte profile', () => {
    describe('when a profile is selected', () => {
      it('should select the option of the profile', async () => {
        const { dropdown } = factory()

        expect(dropdown.element.value).toBe(profiles[1].id.toString())
      })
    })

    describe('when user selects a new active profile from dropdown', () => {
      it.only('should emit "update:modelValue" with the new profile id', async () => {
        const { dropdown, wrapper } = factory()

        await dropdown.setValue(profiles[0].id.toString())

        expect(wrapper.emitted('update:modelValue')).toEqual([[profiles[0].id]])
      })
    })
  })
})
