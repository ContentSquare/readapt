import { mount } from '@vue/test-utils'
import TextProfileRenameButton from './TextProfileRenameButton.vue'
import { textProfileFixture as profile, useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'

describe('TextProfileRenameButton', () => {
  beforeEach(() => {
    mockAlert()
    useTextPreferences().setProfiles([profile])
  })

  afterEach(() => {
    useTextPreferences().reset()
    vi.restoreAllMocks()
  })

  interface FactoryProps {
    profileId: TextProfileId | null
    newProfileName?: string | null
  }

  const factory = ({ profileId, newProfileName = '' }: FactoryProps) => {
    mockPrompt(newProfileName)
    const wrapper = mount(TextProfileRenameButton, {
      props: { profileId }
    })

    const rename = async () => await wrapper.find('button').trigger('click')

    return { wrapper, rename }
  }

  it.each([
    { profileId: null, renders: false },
    { profileId: profile.id, renders: true }
  ])('should render or not the button', ({ profileId, renders }) => {
    const { wrapper } = factory({ profileId })

    expect(wrapper.find('button').exists()).toBe(renders)
  })

  describe('when clicking the button', () => {
    it('should show a prompt with the profile name', async () => {
      const { rename } = factory({ profileId: profile.id })

      await rename()

      expect(prompt).toHaveBeenCalledWith('SETTINGS.PROFILE_RENAME_TO', profile.name)
    })

    describe('when user introduces a new profile name', () => {
      it('should rename the profile', async () => {
        const newProfileName = 'New profile name'
        const { rename } = factory({ profileId: profile.id, newProfileName })
        const { preferences } = useTextPreferences()

        await rename()

        expect(preferences.profiles[0].name).toBe(newProfileName)
      })

      it('should notify about the profile rename', async () => {
        const newProfileName = 'New profile name'
        const { rename } = factory({ profileId: profile.id, newProfileName })

        await rename()

        expect(alert).toBeCalledWith('SETTINGS.PROFILE_RENAMED')
      })

      describe('when a profile with the introduced name already exists', () => {
        const nameExistsFactory = () => {
          const { preferences, setProfiles } = useTextPreferences()
          setProfiles([profile, { ...profile, name: 'New profile name', id: 2 }])
          const { rename } = factory({ profileId: profile.id, newProfileName: 'New profile name' })

          return { rename, preferences }
        }

        it('should not rename the profile', async () => {
          const { rename, preferences } = nameExistsFactory()

          await rename()

          expect(preferences.profiles[0].name).toBe(profile.name)
        })

        it('should show a notification message', async () => {
          const { rename } = nameExistsFactory()

          await rename()

          expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILE_NAME_EXISTS')
        })
      })
    })

    describe('when user cancels the prompt', () => {
      it('should not change the profile name', async () => {
        const { rename } = factory({ profileId: profile.id, newProfileName: null })
        const { preferences } = useTextPreferences()
        const originalName = preferences.profiles[0].name

        await rename()

        expect(preferences.profiles[0].name).toBe(originalName)
      })
    })
  })
})
