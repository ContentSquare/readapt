import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainMenu from '../views/MainMenu.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'MainMenu',
    component: MainMenu
  },
  {
    path: '/dialog-box',
    name: 'DialogBox',
    // this generates a separate chunk which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dialog-box" */ '../views/DialogBox.vue')
  },
  {
    path: '/settings',
    component: () => import('../views/SettingsMenu.vue'),
    children: [
      {
        path: '',
        redirect: 'general'
      },
      {
        path: 'general',
        component: () => import('../views/SettingsMenuGeneral.vue')
      },
      {
        path: 'phonemes',
        component: () => import('../views/SettingsMenuPhonemes.vue')
      },
      {
        path: 'letters',
        component: () => import('../views/SettingsMenuLetters.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
