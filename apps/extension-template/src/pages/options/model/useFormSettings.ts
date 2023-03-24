import { computed, ref, watchEffect, type Ref } from 'vue'
import { buildDefaultProfiles, type Language, type Settings } from '@readapt/settings'
import cloneDeep from 'lodash-es/cloneDeep'
import { useTextPreferences, type TextProfileId } from '@/entities/textPreferences'

export function useFormSettings(selectedProfileId: Ref<TextProfileId | null>) {
  const settingsByLanguage = ref()
  const language = ref<Language>('en')
  const { getProfileById } = useTextPreferences()

  const settings = computed(() => settingsByLanguage.value[language.value])
  const changeLanguage = (newLanguage: Language) => (language.value = newLanguage)

  const updateSettings = ({ key, value }: { key: string; value: unknown }) => {
    settings.value[key] = value
  }

  watchEffect(() => {
    settingsByLanguage.value = buildDefaultProfiles()
    language.value = 'en'
    if (selectedProfileId.value) {
      const profile = getProfileById(selectedProfileId.value)
      if (profile) {
        const { settings: profileSettings } = profile
        settingsByLanguage.value[profileSettings.language] = cloneDeep(profileSettings)
        language.value = profileSettings.language
      }
    }
  })

  return { settings, changeLanguage, updateSettings }
}
