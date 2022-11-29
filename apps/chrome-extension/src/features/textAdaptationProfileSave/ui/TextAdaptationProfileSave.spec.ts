import { mount } from '@vue/test-utils'
import TextAdaptationProfileSave from './TextAdaptationProfileSave.vue'
import { TextAdaptationPreferencesFixtures, TextAdaptationProfileId, useTextAdaptationPreferences } from '@/entities/textAdaptationPreferences'
import { mockAlert, mockPrompt } from '@/shared/test'
import { Settings } from '@readapt/settings'

describe('TextAdaptationProfileSave', () => {
  afterEach(() => {
    useTextAdaptationPreferences().reset()
    jest.restoreAllMocks()
  })

  interface FactoryProps {
    value: TextAdaptationProfileId | undefined
    settings: Settings
  }

  const factory = ({ value, settings }: FactoryProps) => {
    const wrapper = mount(TextAdaptationProfileSave, {
      propsData: {
        value,
        settings
      }
    })
    const { preferencesState, setProfiles } = useTextAdaptationPreferences()

    const alert = mockAlert()
    mockPrompt('My profile')

    return { wrapper, alert, preferencesState, setProfiles }
  }

  describe('when save button is clicked', () => {
    describe('when the profile is new', () => {
      const { settings } = TextAdaptationPreferencesFixtures

      it('should create a new profile', async () => {
        const { wrapper, preferencesState } = factory({ value: undefined, settings })

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferencesState.profiles).toEqual([
          {
            id: expect.anything(),
            name: 'My profile',
            settings
          }
        ])
      })

      it('should notify about new profile creation', async () => {
        const { wrapper, alert } = factory({ value: undefined, settings })

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(alert).toHaveBeenCalledTimes(1)
      })

      it('should emit "input" with the new profile id', async () => {
        const {
          wrapper,
          preferencesState: { profiles }
        } = factory({ value: undefined, settings })

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(wrapper.emitted('input')).toEqual([[profiles[0].id]])
      })
    })

    describe('when the profile exists', () => {
      const { profile } = TextAdaptationPreferencesFixtures
      const newSettings: Settings = {
        ...profile.settings,
        letterSpacing: '5px',
        fontFamily: 'Arial'
      }

      it('should edit the profile', async () => {
        const { wrapper, preferencesState, setProfiles } = factory({ value: profile.id, settings: newSettings })
        setProfiles([profile])

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(preferencesState.profiles).toEqual([
          {
            ...profile,
            settings: newSettings
          }
        ])
        expect(true).toBe(true)
      })

      it('should notify about profile update', async () => {
        const { wrapper, alert } = factory({ value: profile.id, settings: newSettings })

        await wrapper.find('[data-test-id=save]').trigger('click')

        expect(alert).toHaveBeenCalledTimes(1)
      })
    })
  })
})
