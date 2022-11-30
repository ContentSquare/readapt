import { mount } from '@vue/test-utils'
import TextProfilesActiveDropdown from './TextProfilesActiveDropdown.vue'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { TextProfileId } from '@/entities/textPreferences/model/TextPreferences'

describe('TextProfilesActiveDropdown', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })

  afterEach(() => {
    useTextPreferences().reset()
  })

  const factory = (profileId: TextProfileId | null = null) => {
    const wrapper = mount(TextProfilesActiveDropdown, {
      propsData: {
        // value: profileId
      }
    })
    const dropdown = wrapper.find<HTMLSelectElement>('[data-test-id=dropdown]')

    return { wrapper, dropdown }
  }

  it('should render profiles as options', () => {
    const { dropdown } = factory()

    expect(dropdown.find(`[value="${profile.id}"]`).text()).toBe(profile.name)
  })
})
