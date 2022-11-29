import { mount } from '@vue/test-utils'
import TextAdaptationProfileSave from './TextAdaptationProfileSave.vue'
import { TextAdaptationPreferencesFixtures, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'

describe('TextAdaptationProfileSave', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
  })

  describe('when save button is clicked', () => {
    describe('when the profile is new', () => {
      it('should create a new profile', async () => {
        const wrapper = mount(TextAdaptationProfileSave)
        const { preferencesState } = useTextAdaptationPreferences()
        const newProfileName = 'Profile 1'
        jest.spyOn(window, 'prompt').mockReturnValueOnce(newProfileName)

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferencesState.profiles).toEqual([
          {
            ...TextAdaptationPreferencesFixtures.profile,
            name: newProfileName
          }
        ])
      })
    })
  })
})
