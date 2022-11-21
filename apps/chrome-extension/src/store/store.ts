import Vue from 'vue'
import Vuex from 'vuex'

import { StoreModel } from '@readapt/settings'
import { sharedStoreMutations, sharedStoreGetters } from '@readapt/shared-components'

Vue.use(Vuex)

export const store = new Vuex.Store<StoreModel>({
  mutations: {
    ...sharedStoreMutations
  },
  getters: {
    ...sharedStoreGetters
  }
})
