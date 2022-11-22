import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import MainMenu from '@/views/MainMenu.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'main',
    component: MainMenu
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
    component: () => import('@/pages/options')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
