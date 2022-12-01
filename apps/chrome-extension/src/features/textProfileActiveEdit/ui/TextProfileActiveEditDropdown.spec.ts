import { mount } from '@vue/test-utils'
import TextProfileActiveEditDropdown from './TextProfileActiveEditDropdown.vue'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'

describe('TextProfileActiveEditDropdown', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })
  const profiles = [profile, { ...profile, id: 2, name: 'Other' }]

  const factory = () => {
    const { preferences, setActiveProfileId, setProfiles } = useTextPreferences()
    setProfiles(profiles)
    setActiveProfileId(profiles[0].id)

    const wrapper = mount(TextProfileActiveEditDropdown)
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown, preferences, setActiveProfileId }
  }

  describe('dropdown options', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory()

      for (const profile of profiles) {
        expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
      }
    })
  })

  describe('active profile', () => {
    describe('when there is an active profile', () => {
      it('should select the option of active profile', async () => {
        const { dropdown } = factory()

        expect(dropdown.element.value).toBe(profiles[0].id.toString())
      })
    })

    describe('when user selects a new active profile from dropdown', () => {
      it('should change the active profile', async () => {
        const { dropdown, preferences } = factory()

        await dropdown.setValue(profiles[1].id)

        expect(preferences.activeProfileId).toBe(profiles[1].id)
      })
    })
  })
})
