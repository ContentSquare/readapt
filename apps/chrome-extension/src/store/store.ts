import Vuex from 'vuex'

import { StoreModel } from '@readapt/settings'
import { sharedStoreMutations, sharedStoreGetters } from '@readapt/shared-components'

export const store = new Vuex.Store<StoreModel>({
  mutations: {
    ...sharedStoreMutations
  },
  getters: {
    ...sharedStoreGetters
  }
})
