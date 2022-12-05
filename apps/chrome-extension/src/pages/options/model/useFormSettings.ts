import { computed, Ref, ref, watchEffect } from 'vue'
import { Language, Settings } from '@readapt/settings'
import { buildDefaultProfiles } from '@readapt/settings'
import cloneDeep from 'lodash/cloneDeep'
import { TextProfileId, useTextPreferences } from '@/entities/textPreferences'

export function useFormSettings(selectedProfileId: Ref<TextProfileId | null>) {
  const settingsByLanguage = ref()
  const language = ref<Language>('en')
  const { getProfileById } = useTextPreferences()

  const settings = computed(() => settingsByLanguage.value[language.value])
  const setLanguage = (newLanguage: Language) => (language.value = newLanguage)
  const updateSettings = <K extends keyof Settings>(key: K, value: Settings[K]) => {
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

  return { settings, language, setLanguage, updateSettings }
}
