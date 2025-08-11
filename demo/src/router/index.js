import { createRouter, createWebHistory } from 'vue-router'
import IconList from '../views/IconList.vue'
import IconPreview from '@/components/IconPreview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IconList,
    },
    {
      path: '/:icon',
      name: 'icon-preview',
      component: IconPreview
    }
  ],
})

export default router
