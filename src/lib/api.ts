import router from '@/router'
import { refresh } from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import { QueryClient, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'

import { effectScope } from 'vue'
import { queryClient } from './utils'

type Message = string | Record<string, string> | null

export type SuccessResponse<T> = {
  success: boolean
  data: T
  message: Message
}

export type ErrorResponse = AxiosError<{
  success: boolean
  data?: null
  message: Message
}>

export const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use(async config => {
  const modifiedConfig = { ...config }
  const auth = useAuthStore()

  if (auth.accessToken) {
    modifiedConfig.headers.Authorization = `Bearer ${auth.accessToken}`
  }

  return modifiedConfig
})

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    console.log(error)
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      try {
        const authStore = useAuthStore()

        const refreshResponse = await refresh({
          refreshToken: authStore.refreshToken,
        })

        authStore.updateAccessToken(refreshResponse.data.accessToken)
        authStore.updateRefreshToken(refreshResponse.data.refreshToken)
      } catch (refreshError) {
        localStorage.clear()
        queryClient.clear()
        router.replace('/sign-in')

        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)
