import { computed, Ref, ref, watchEffect } from 'vue'
import { Language, Settings } from '@readapt/settings'
import { buildDefaultProfiles } from '@readapt/settings'
import cloneDeep from 'lodash/cloneDeep'

export function useFormSettings(language: Ref<Language>, baseSettings: Ref<Settings | null> = ref(null)) {
  const settingsByLanguage = ref(buildDefaultProfiles())

  const settings = computed(() => settingsByLanguage.value[language.value])
  const reset = () => (settingsByLanguage.value = buildDefaultProfiles())
  const updateSettings = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    settings.value[key] = value
  }

  watchEffect(() => {
    reset()
    if (baseSettings.value) {
      const { language } = baseSettings.value
      settingsByLanguage.value[language] = cloneDeep(baseSettings.value)
    }
  })

  return {
    settings,
    updateSettings
  }
}
