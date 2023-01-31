import { mount } from '@vue/test-utils'
import TextProfileDeleteButton from './TextProfileDeleteButton.vue'
import { textProfileFixture as profile, useTextPreferences, type TextProfileId } from '@/entities/textPreferences'
import { mockAlert, mockConfirm } from '@/shared/test'

describe('TextProfileDeleteButton', () => {
  beforeEach(() => {
    useTextPreferences().setProfiles([profile])
  })

  afterEach(() => {
    useTextPreferences().reset()
    vi.restoreAllMocks()
  })

  interface FactoryProps {
    value: TextProfileId | null
    confirmValue?: boolean
  }

  const factory = ({ value, confirmValue = true }: FactoryProps) => {
    mockAlert()
    mockConfirm(confirmValue)
    const wrapper = mount(TextProfileDeleteButton, {
      props: { value },
      mocks: {
        $t: (value: string) => value
      }
    })

    const triggerDelete = async () => await wrapper.find('[data-test-id=delete]').trigger('click')

    return { wrapper, triggerDelete }
  }

  it.each([
    { value: null, renders: false },
    { value: profile.id, renders: true }
  ])('should render or not delete button', ({ value, renders }) => {
    const { wrapper } = factory({ value })

    expect(wrapper.find('[data-test-id=delete]').exists()).toBe(renders)
  })

  describe('when clicking the button', () => {
    it('should show a confirm', async () => {
      const { triggerDelete } = factory({ value: profile.id })

      await triggerDelete()

      expect(confirm).toHaveBeenCalledWith('SETTINGS.PROFILE_DELETE_CONFIRM')
    })

    describe('when user confirms the profile deletion', () => {
      it('should delete the profile', async () => {
        const { triggerDelete } = factory({ value: profile.id })
        const { preferences } = useTextPreferences()

        await triggerDelete()

        expect(preferences.profiles).toHaveLength(0)
      })

      it('should show a notification about profile deletion', async () => {
        const { triggerDelete } = factory({ value: profile.id })

        await triggerDelete()

        expect(alert).toHaveBeenCalledWith('SETTINGS.PROFILE_DELETED')
      })

      it('should emit "input" with null', async () => {
        const { wrapper, triggerDelete } = factory({ value: profile.id })
        useTextPreferences().setProfiles([])

        await triggerDelete()

        expect(wrapper.emitted('input')).toEqual([[null]])
      })
    })

    describe('when user cancels the profile deletion', () => {
      it('should not delete the profile', async () => {
        const { triggerDelete } = factory({ value: profile.id, confirmValue: false })
        const { preferences } = useTextPreferences()

        await triggerDelete()

        expect(preferences.profiles).toHaveLength(1)
      })
    })
  })
})
