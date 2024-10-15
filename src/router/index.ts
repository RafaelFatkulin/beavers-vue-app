import { useGetCurrentUserQuery } from '@/queries/auth'
import { useAuthStore } from '@/stores/auth'
import { effectScope, watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutView.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('@/pages/SignIn.vue'),
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/SignUp.vue'),
    },
  ],
})

const isAuthenticated = () => {
  const auth = useAuthStore()
  return !!auth.accessToken
}

router.beforeEach((to, from, next) => {
  const scope = effectScope()
  let user = null

  scope.run(() => {
    const { data } = useGetCurrentUserQuery()

    user = data.value?.data
  })

  scope.stop()

  const accessToken = localStorage.getItem('access_token')

  if (to.path !== '/sign-in' && to.path !== '/sign-up' && !accessToken) {
    return next('/sign-in')
  }

  if ((to.path === '/sign-in' || to.path === '/sign-up') && accessToken) {
    return next('/about')
  }

  next()
})

router.onError(error => {
  console.log('@router-error', error)
})

export default router
