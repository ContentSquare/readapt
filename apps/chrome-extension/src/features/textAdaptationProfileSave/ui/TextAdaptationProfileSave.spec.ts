import { mount } from '@vue/test-utils'
import TextAdaptationProfileSave from './TextAdaptationProfileSave.vue'
import { TextAdaptationPreferencesFixtures, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextAdaptationProfileSave', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
    jest.restoreAllMocks()
  })

  const { settings, profile } = TextAdaptationPreferencesFixtures

  describe('when save button is clicked', () => {
    describe('when the profile is new', () => {
      const newProfileFactory = (newProfileName = 'My Profile') => {
        const wrapper = mount(TextAdaptationProfileSave, {
          propsData: {
            value: null,
            settings
          }
        })
        const { preferencesState, setProfiles } = useTextAdaptationPreferences()

        mockPrompt(newProfileName)

        return { wrapper, preferencesState, setProfiles, alert: mockAlert() }
      }

      it('should create a new profile', async () => {
        const { wrapper, preferencesState } = newProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferencesState.profiles).toEqual([
          {
            id: expect.anything(),
            name: 'My Profile',
            settings
          }
        ])
      })

      it('should notify about new profile creation', async () => {
        const { wrapper, alert } = newProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(alert).toHaveBeenCalledTimes(1)
      })

      it('should emit "input" with the new profile id', async () => {
        const {
          wrapper,
          preferencesState: { profiles }
        } = newProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(wrapper.emitted('input')).toEqual([[profiles[0].id]])
      })

      describe('when user did not introduce a profile name', () => {
        it('should not create a new profile', async () => {
          const { wrapper, preferencesState } = newProfileFactory('')

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(preferencesState.profiles).toEqual([])
        })
      })

      describe('when user introduced an existing profile name', () => {
        it('should not create a new profile', async () => {
          const { wrapper, preferencesState, setProfiles } = newProfileFactory(profile.name)
          setProfiles([profile])

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(preferencesState.profiles).toEqual([profile])
        })

        it('should notify that a profile with the same name exists', async () => {
          const { wrapper, setProfiles, alert } = newProfileFactory(profile.name)
          setProfiles([profile])

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(alert).toHaveBeenCalledTimes(1)
        })
      })
    })

    describe('when the profile exists', () => {
      const newSettings: Settings = {
        ...profile.settings,
        letterSpacing: '5px',
        fontFamily: 'Arial'
      }

      const editProfileFactory = () => {
        const wrapper = mount(TextAdaptationProfileSave, {
          propsData: {
            value: profile.id,
            settings: newSettings
          }
        })
        const { preferencesState, setProfiles } = useTextAdaptationPreferences()

        return { wrapper, preferencesState, setProfiles, alert: mockAlert() }
      }

      it('should edit the profile', async () => {
        const { wrapper, preferencesState, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferencesState.profiles).toEqual([
          {
            ...profile,
            settings: newSettings
          }
        ])
      })

      it('should notify about profile update', async () => {
        const { wrapper, alert } = editProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(alert).toHaveBeenCalledTimes(1)
      })
    })
  })
})
