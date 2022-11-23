import TextAdaptationProfilesDropdown from './TextAdaptationProfilesDropdown.vue'
import { mount } from '@vue/test-utils'
import { TextAdaptationProfile } from '../model/TextAdaptationProfile'
import { TestFixtures } from '@/shared/tests'

describe('TextAdaptationProfilesDropdown.vue', () => {
  const profiles: TextAdaptationProfile[] = [
    {
      id: 'profile-1',
      name: 'Profile 1',
      settings: TestFixtures.settings
    },
    {
      id: 'profile-2',
      name: 'Profile 2',
      settings: TestFixtures.settings
    }
  ]

  it('should render options with profiles', () => {
    const wrapper = mount(TextAdaptationProfilesDropdown, { propsData: { profiles } })

    const dropdown = wrapper.find('[data-test-id=dropdown]')

    profiles.forEach(({ name, id }) => expect(dropdown.find(`[value=${id}]`).text()).toBe(name))
  })

  it('should render new profile option', () => {
    const wrapper = mount(TextAdaptationProfilesDropdown, { propsData: { profiles } })

    expect(wrapper.find('[data-test-id=dropdown] option[value=""]').text()).toBe('New Profile')
  })
})
