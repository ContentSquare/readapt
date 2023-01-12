import Vue from 'vue'
import VueRouter, { type RouteConfig } from 'vue-router'

import { MainMenuPage } from '@/pages/mainMenu'

export function withRouter() {
  Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      path: '/',
      name: 'main',
      component: MainMenuPage
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

  return { router }
}
