import Vue from 'vue'
import Vuex from 'vuex'

import { StoreModel } from '@readapt/settings'
import { sharedStoreMutations, sharedStoreGetters } from '@readapt/shared-components'

import { getStateFromLocalStorage } from '@/store/storage'

Vue.use(Vuex)

export default new Vuex.Store<StoreModel>({
  state: getStateFromLocalStorage(),
  mutations: {
    ...sharedStoreMutations
  },
  getters: {
    ...sharedStoreGetters
  }
})
