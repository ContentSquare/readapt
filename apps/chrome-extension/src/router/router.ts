import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import { PopupPage } from '@/pages/popup'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: PopupPage
  },
  {
    path: '/templates',
    name: 'templates',
    component: () => import('@/views/TemplateSelect.vue')
  },
  {
    path: '/options',
    name: 'options',
    component: async () => (await import('@/pages/options')).OptionsPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
