import Vue from 'vue'
import Vuex from 'vuex'

import { Language, ColoredItem, Settings, SettingsKey, ColoredOption, getLangConfig, buildDefaultSettings } from '@readapt/settings'
import { Profiles } from '@/interfaces'
import { buildDefaultProfiles } from '@/constants/defaultProfiles'
import { loadStoredSettings, saveSettings } from '@/store/storage'

Vue.use(Vuex)

interface StoreModel {
  profiles: Profiles
  language: Language
}

const getStateFromLocalStorage = (): StoreModel => {
  const defaultState: StoreModel = {
    profiles: buildDefaultProfiles(),
    language: 'en'
  }

  const settings = loadStoredSettings()
  if (settings) {
    const { language } = settings
    defaultState.profiles[language] = settings
    defaultState.language = language
  }
  return defaultState
}

export default new Vuex.Store<StoreModel>({
  state: getStateFromLocalStorage(),
  mutations: {
    LOAD_SAVED_SETTINGS(state) {
      const { profiles, language } = getStateFromLocalStorage()
      state.profiles = profiles
      state.language = language
    },
    UPDATE_SETTINGS(state, settings: Settings) {
      const language = settings.language
      state.language = language
      state.profiles[language] = settings
    },
    UPDATE_OPTION(state, payload: { key: SettingsKey; value: never }) {
      const { language, profiles } = state
      const settings = profiles[language]
      state.profiles[language] = {
        ...settings,
        [payload.key]: payload.value
      }
    },
    NEW_SETTINGS(state) {
      const { language } = state
      state.profiles[language] = buildDefaultSettings(language)
    },
    CHANGE_LANGUAGE(state, language) {
      state.language = language
    }
  },
  actions: {
    loadSavedSettings(context) {
      context.commit('LOAD_SAVED_SETTINGS')
    },
    saveSettings(context) {
      const { language, profiles } = context.state
      saveSettings(profiles[language])
    },
    updateSettings(context, payload: Settings) {
      context.commit('UPDATE_SETTINGS', payload)
    },
    updateOption(context, payload: { key: SettingsKey; value: never }) {
      context.commit('UPDATE_OPTION', payload)
    },
    newSettings(context) {
      context.commit('NEW_SETTINGS')
    },
    changeLanguage(context, payload: Language) {
      context.commit('CHANGE_LANGUAGE', payload)
    }
  },
  getters: {
    getSettings: (state): Settings => {
      const { language, profiles } = state
      return profiles[language]
    },
    getPhonemes: (state): ColoredItem[] => {
      const { language, profiles } = state
      return profiles[language].phonemes
    },
    getLetters: (state): ColoredItem[] => {
      const { language, profiles } = state
      return profiles[language].letters
    },
    getLetterOptions: (state): ColoredOption[] => {
      return getLangConfig(state.language).letterOptions
    },
    getPhonemeOptions: (state): ColoredOption[] => {
      return getLangConfig(state.language).phonemeOptions
    },
    getTextPreview: (state): string => {
      return getLangConfig(state.language).textPreview
    }
  }
})
