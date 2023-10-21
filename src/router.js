import { createRouter, createWebHistory } from 'vue-router'
const JewishEncrypt = () => import('./views/JewishEncrypt.vue')
const CesarEncrypt = () => import('./views/CesarEncrypt.vue')
const VigenereEncrypt = () => import('./views/VigenereEncrypt.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: JewishEncrypt
    },

    {
      path: '/atbash',
      component: JewishEncrypt
    },

    {
      path: '/cesar',
      component: CesarEncrypt
    },
    {
      path: '/vigenere',
      component: VigenereEncrypt
    },
  ],
})