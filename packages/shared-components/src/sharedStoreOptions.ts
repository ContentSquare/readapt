import { MutationTree, GetterTree } from 'vuex'
import { StoreModel, buildDefaultSettings, ColoredItem, ColoredOption, getLangConfig, LangConfig, Settings, SettingsKey } from '@readapt/settings'

const sharedStoreMutations: MutationTree<StoreModel> = {
  resetState(state, newState: StoreModel) {
    state = newState
  },
  updateSettings(state, settings: Settings) {
    const language = settings.language
    state.language = language
    state.profiles[language] = settings
  },
  updateOption(state, payload: { key: SettingsKey; value: unknown }) {
    const { language, profiles } = state
    const settings = profiles[language]
    state.profiles[language] = {
      ...settings,
      [payload.key]: payload.value
    }
  },
  newSettings(state) {
    const { language } = state
    state.profiles[language] = buildDefaultSettings(language)
  },
  changeLanguage(state, language) {
    state.language = language
  }
}

const sharedStoreGetters: GetterTree<StoreModel, StoreModel> = {
  getSettings: ({ language, profiles }: StoreModel): Settings => profiles[language],

  getPhonemes: (state, getters): ColoredItem[] => getters.getSettings.phonemes,

  getPhonemesActive: (state, getters): boolean => getters.getSettings.phonemesActive,

  getLetters: (state, getters): ColoredItem[] => getters.getSettings.letters,

  getLettersActive: (state, getters): boolean => getters.getSettings.lettersActive,

  getLangConfig: (state): LangConfig => getLangConfig(state.language),

  getLetterOptions: (state, getters): ColoredOption[] => getters.getLangConfig.letterOptions,

  getPhonemeOptions: (state, getters): ColoredOption[] => getters.getLangConfig.phonemeOptions,

  getTextPreview: (state, getters): string => getters.getLangConfig.textPreview
}

export { sharedStoreGetters, sharedStoreMutations }
