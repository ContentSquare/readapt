import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import { StoreModel } from '@readapt/settings'
import { sharedStoreMutations, sharedStoreGetters } from '@readapt/shared-components'

import { getStateFromLocalStorage } from '@/store/storage'

export async function initializeStore(): Promise<Store<StoreModel>> {
  Vue.use(Vuex)

  return new Vuex.Store<StoreModel>({
    state: await getStateFromLocalStorage(),
    mutations: {
      ...sharedStoreMutations
    },
    getters: {
      ...sharedStoreGetters
    }
  })
}
