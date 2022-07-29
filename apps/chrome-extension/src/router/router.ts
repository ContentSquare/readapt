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
    redirect: { path: '/settings/general', query: { newSettings: 'true' } }
  },
  {
    path: '/settings',
    component: () => import('@/views/SettingsMenu.vue'),
    children: [
      {
        path: '',
        redirect: 'general'
      },
      {
        path: 'general',
        component: () => import('@/views/SettingsMenuGeneral.vue')
      },
      {
        path: 'phonemes',
        props: { name: 'phonemes' },
        component: () => import('@/views/SettingsMenuPhonemes.vue')
      },
      {
        path: 'letters',
        props: { name: 'letters' },
        component: () => import('@/views/SettingsMenuLetters.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
