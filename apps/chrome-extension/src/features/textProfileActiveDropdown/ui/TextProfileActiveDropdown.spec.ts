import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import TextProfilesActiveDropdown from './TextProfilesActiveDropdown.vue'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { TextProfileId } from '@/entities/textPreferences/model/TextPreferences'

describe('TextProfileActiveDropdown', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })

  afterEach(() => {
    useTextPreferences().reset()
  })

  const factory = () => {
    const wrapper = mount(TextProfilesActiveDropdown)
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  describe('profiles dropdown', () => {
    it('should render profiles as options', () => {
      const { dropdown } = factory()

      expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
    })

    it('should render no active profile option', () => {
      const { dropdown } = factory()

      expect(dropdown.find('option[value=""]').text()).toBe('Disable (no active profile)')
    })
  })

  describe('active profile', () => {
    describe('when there is an active profile', () => {
      it('should select the option of active profile', async () => {
        const { dropdown } = factory()
        const { setActiveProfileId } = useTextPreferences()

        setActiveProfileId(profile.id)
        await nextTick()

        expect(dropdown.element.value).toBe(profile.id.toString())
      })
    })

    describe('when there is no active profile', () => {
      it('should select the option with no active profile', () => {
        const { dropdown } = factory()

        expect(dropdown.element.value).toBe('')
      })
    })
  })
})
