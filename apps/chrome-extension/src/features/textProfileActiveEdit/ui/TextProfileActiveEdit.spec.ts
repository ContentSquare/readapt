import { shallowMount } from '@vue/test-utils'
import TextProfileActiveEdit from './TextProfileActiveEdit.vue'
import { textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'

describe('TextProfileActiveEdit', () => {
  afterEach(() => {
    useTextPreferences().reset()
  })

  describe('when having text profiles saved', () => {
    it('should render edit active profile dropdown', () => {
      useTextPreferences().setProfiles([profile])
      const wrapper = shallowMount(TextProfileActiveEdit)
      expect(wrapper.find('[data-test-id=dropdown]').exists()).toBe(true)
    })
  })

  describe('when having no text profiles saved', () => {
    it('should not render edit active profile dropdown', () => {
      const wrapper = shallowMount(TextProfileActiveEdit)
      expect(wrapper.find('[data-test-id=dropdown]').exists()).toBe(false)
    })
  })
})
