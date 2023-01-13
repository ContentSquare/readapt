import { useTextPreferences, type TextSettings } from '@/entities/textPreferences'

export function useCreateTextProfileFromTemplate() {
  const { createProfile, updateProfile } = useTextPreferences()

  const create = (settings: TextSettings) => {
    const newProfileId = createProfile({
      name: 'Temp',
      settings
    })
    updateProfile(newProfileId, {
      name: `From template (${newProfileId})`
    })

    return newProfileId
  }

  return create
}
