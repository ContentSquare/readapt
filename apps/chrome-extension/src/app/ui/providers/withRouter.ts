import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import { MainMenuPage } from '@/pages/mainMenu'

export function withRouter() {
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'main',
      component: MainMenuPage
    },
    {
      path: '/templates',
      name: 'templates',
      component: async () => (await import('@/pages/templates')).TemplatesPage
    },
    {
      path: '/options',
      name: 'options',
      component: async () => (await import('@/pages/options')).OptionsPage
    }
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  return { router }
}
