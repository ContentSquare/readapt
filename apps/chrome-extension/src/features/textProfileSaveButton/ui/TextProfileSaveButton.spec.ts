import { mount } from '@vue/test-utils'
import TextProfileSave from './TextProfileSaveButton.vue'
import { textSettingsFixture as settings, textProfileFixture as profile, useTextPreferences } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import type { Settings } from '@readapt/settings'

describe('TextProfileSaveButton', () => {
  beforeEach(() => {
    mockAlert()
  })

  afterEach(() => {
    useTextPreferences().reset()
    vi.restoreAllMocks()
  })

  describe('when save button is clicked', () => {
    describe('when the profile is new', () => {
      const newProfileFactory = (newProfileName = 'My Profile') => {
        mockPrompt(newProfileName)

        const wrapper = mount(TextProfileSave, {
          props: {
            modelValue: null,
            settings
          }
        })
        const { preferences, setProfiles, setActiveProfileId } = useTextPreferences()

        const save = async () => await wrapper.find('[data-test-id=save]').trigger('click')

        return { wrapper, preferences, setProfiles, setActiveProfileId, save }
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
        const { save } = newProfileFactory()

        await save()

        expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILE_CREATED')
      })

      it('should emit "update:modelValue" with the new profile id', async () => {
        const {
          wrapper,
          save,
          preferences: { profiles }
        } = newProfileFactory()

        await save()

        expect(wrapper.emitted('update:modelValue')).toEqual([[profiles[0].id]])
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
          const { save, setProfiles } = newProfileFactory(profile.name)
          setProfiles([profile])

          await save()

          // TODO: check also if the profile name was supplied
          expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILE_NAME_EXISTS')
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
          const { save, setProfiles } = newProfileFactory()
          setProfiles(profiles)

          await save()

          expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILES_MAX')
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
          props: {
            modelValue: profile.id,
            settings: newSettings
          },
          mocks: {
            $t: (v: string) => v
          }
        })
        const { preferences, setProfiles } = useTextPreferences()

        const save = async () => await wrapper.find('[data-test-id=save]').trigger('click')

        return { wrapper, preferences, setProfiles, save }
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
        const { save, setProfiles } = editProfileFactory()
        setProfiles([profile])

        await save()

        expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILE_UPDATED')
      })
    })
  })
})
