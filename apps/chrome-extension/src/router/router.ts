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
    path: '/new-settings',
    redirect: { path: '/settings', query: { newSettings: 'true' } }
  },
  {
    path: '/settings',
    component: async () => (await import('@/pages/options')).OptionsPage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
