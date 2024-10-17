import { useGetCurrentUserQuery } from '@/queries/auth'
import { effectScope } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { HomeIcon, InfoIcon } from 'lucide-vue-next'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/TheAuthLayout.vue'),
      children: [
        {
          path: '/sign-in',
          name: 'sign-in',
          component: () => import('@/pages/SignIn.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/TheDashboardLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/pages/HomeView.vue'),
          meta: {
            type: 'dashboard',
            title: 'Главная',
            icon: HomeIcon,
            order: 1,
          },
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/pages/AboutView.vue'),
          meta: {
            type: 'dashboard',
            title: 'О нас',
            icon: InfoIcon,
            order: 2,
          },
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const scope = effectScope()
  let user = null

  scope.run(() => {
    const { data } = useGetCurrentUserQuery()

    user = data.value?.data
  })

  scope.stop()

  const accessToken = localStorage.getItem('access_token')

  if (to.path !== '/sign-in' && !accessToken) {
    return next('/sign-in')
  }

  if (to.path === '/sign-in' && accessToken) {
    return next('/dashboard')
  }

  next()
})

router.onError(error => {
  console.log('@router-error', error)
})

export default router
