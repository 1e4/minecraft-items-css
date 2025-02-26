import { createRouter, createWebHistory } from 'vue-router'
import IconList from '../views/IconList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IconList,
    },
  ],
})

export default router
