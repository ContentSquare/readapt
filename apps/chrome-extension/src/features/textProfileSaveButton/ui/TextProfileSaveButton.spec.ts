import { mount } from '@vue/test-utils'
import TextProfileSave from './TextProfileSaveButton.vue'
import { textSettingsFixture as settings, textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextProfileSaveButton', () => {
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
        const { preferences, setProfiles, setActiveProfileId } = useTextPreferences()

        mockPrompt(newProfileName)
        const save = async () => await wrapper.find('[data-test-id=save]').trigger('click')

        return { wrapper, preferences, setProfiles, setActiveProfileId, alert: mockAlert(), save }
      }

      it('should create a new profile', async () => {
        const { save, preferences } = newProfileFactory()

        await save()

        expect(preferences.profiles).toEqual([
          {
            id: expect.anything(),
            name: 'My Profile',
            settings
          }
        ])
      })

      it('should notify about new profile creation', async () => {
        const { save, alert } = newProfileFactory()

        await save()

        expect(alert).toHaveBeenCalledWith('The profile has been created!')
      })

      it('should emit "input" with the new profile id', async () => {
        const {
          wrapper,
          save,
          preferences: { profiles }
        } = newProfileFactory()

        await save()

        expect(wrapper.emitted('input')).toEqual([[profiles[0].id]])
      })

      describe('when having no profiles saved', () => {
        it('should mark the created profile as active', async () => {
          const { save, preferences } = newProfileFactory()

          await save()

          expect(preferences.activeProfileId).toBe(1)
        })
      })

      describe('when having profiles saved', () => {
        it('should not mark the created profile as active', async () => {
          const { preferences, setProfiles, setActiveProfileId, save } = newProfileFactory()
          setProfiles([profile])
          setActiveProfileId(profile.id)

          await save()

          expect(preferences.activeProfileId).toBe(profile.id)
        })
      })

      describe('when user did not introduce a profile name', () => {
        it('should not create a new profile', async () => {
          const { save, preferences } = newProfileFactory('')

          await save()

          expect(preferences.profiles).toEqual([])
        })
      })

      describe('when user introduced an existing profile name', () => {
        it('should not create a new profile', async () => {
          const { save, preferences, setProfiles } = newProfileFactory(profile.name)
          setProfiles([profile])

          await save()

          expect(preferences.profiles).toEqual([profile])
        })

        it('should notify that a profile with the same name exists', async () => {
          const { save, setProfiles, alert } = newProfileFactory(profile.name)
          setProfiles([profile])

          await save()

          expect(alert).toHaveBeenCalledWith(`A profile with "${profile.name}" name already exists! Please try another name.`)
        })
      })

      describe('when having 20 profiles', () => {
        const profiles = Array.from(Array(20), (_, index) => {
          const id = index + 1
          return {
            ...profile,
            name: `Profile name ${id}`,
            id
          }
        })

        it('should not create a new profile', async () => {
          const { save, preferences, setProfiles } = newProfileFactory()
          setProfiles(profiles)

          await save()

          expect(preferences.profiles).toStrictEqual(profiles)
        })

        it('should notify about max number of profiles', async () => {
          const { save, alert, setProfiles } = newProfileFactory()
          setProfiles(profiles)

          await save()

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

        const save = async () => await wrapper.find('[data-test-id=save]').trigger('click')

        return { wrapper, preferences, setProfiles, alert: mockAlert(), save }
      }

      it('should edit the profile', async () => {
        const { save, preferences, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await save()

        expect(preferences.profiles).toEqual([
          {
            ...profile,
            settings: newSettings
          }
        ])
      })

      it('should notify about profile update', async () => {
        const { save, alert, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await save()

        expect(alert).toHaveBeenCalledWith('The profile has been updated!')
      })
    })
  })
})
