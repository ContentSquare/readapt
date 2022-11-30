import { mount } from '@vue/test-utils'
import TextProfileSave from './TextProfileSave.vue'
import { textSettingsFixture as settings, textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextProfileSave', () => {
  afterEach(() => {
    useTextPreferences().reset()
    jest.restoreAllMocks()
  })

  describe('when save button is clicked', () => {
    describe('when the profile is new', () => {
      const newProfileFactory = (newProfileName = 'My Profile') => {
        const wrapper = mount(TextProfileSave, {
          propsData: {
            value: null,
            settings
          }
        })
        const { preferences, setProfiles } = useTextPreferences()

        mockPrompt(newProfileName)

        return { wrapper, preferences, setProfiles, alert: mockAlert() }
      }

      it('should create a new profile', async () => {
        const { wrapper, preferences } = newProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferences.profiles).toEqual([
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

        expect(alert).toHaveBeenCalledWith('The profile has been created!')
      })

      it('should emit "input" with the new profile id', async () => {
        const {
          wrapper,
          preferences: { profiles }
        } = newProfileFactory()

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(wrapper.emitted('input')).toEqual([[profiles[0].id]])
      })

      describe('when user did not introduce a profile name', () => {
        it('should not create a new profile', async () => {
          const { wrapper, preferences } = newProfileFactory('')

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(preferences.profiles).toEqual([])
        })
      })

      describe('when user introduced an existing profile name', () => {
        it('should not create a new profile', async () => {
          const { wrapper, preferences, setProfiles } = newProfileFactory(profile.name)
          setProfiles([profile])

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(preferences.profiles).toEqual([profile])
        })

        it('should notify that a profile with the same name exists', async () => {
          const { wrapper, setProfiles, alert } = newProfileFactory(profile.name)
          setProfiles([profile])

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(alert).toHaveBeenCalledWith(`A profile with "${profile.name}" name already exists! Please try another name.`)
        })
      })

      describe('when there are 20 profiles created', () => {
        const profiles = Array.from(Array(20), (_, index) => {
          const id = index + 1
          return {
            ...profile,
            name: `Profile name ${id}`,
            id
          }
        })

        it('should not create a new profile', async () => {
          const { wrapper, preferences, setProfiles } = newProfileFactory()
          setProfiles(profiles)

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(preferences.profiles).toStrictEqual(profiles)
        })

        it('should notify about max number of profiles', async () => {
          const { wrapper, alert, setProfiles } = newProfileFactory()
          setProfiles(profiles)

          await wrapper.find('[data-test-id=save]').trigger('click')

          expect(alert).toHaveBeenCalledWith('You can have up to 20 profiles. Please delete some profiles and try again.')
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
        const wrapper = mount(TextProfileSave, {
          propsData: {
            value: profile.id,
            settings: newSettings
          }
        })
        const { preferences, setProfiles } = useTextPreferences()

        return { wrapper, preferences, setProfiles, alert: mockAlert() }
      }

      it('should edit the profile', async () => {
        const { wrapper, preferences, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferences.profiles).toEqual([
          {
            ...profile,
            settings: newSettings
          }
        ])
      })

      it('should notify about profile update', async () => {
        const { wrapper, alert, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(alert).toHaveBeenCalledWith('The profile has been updated!')
      })
    })
  })
})
