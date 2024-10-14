import { useAuthStore } from '@/stores/auth'
import { QueryClient, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'

import router from '@/router'

type Message = string | Record<string, string> | null

export type SuccessResponse<T> = {
  success: boolean
  data: T
  message: Message
}

export type ErrorResponse = {
  success: boolean
  data?: null
  message: Message
}

export const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use(
  async config => {
    const modifiedConfig = { ...config }
    const auth = useAuthStore()

    if (auth.accessToken) {
      modifiedConfig.headers.Authorization = `Bearer ${auth.accessToken}`
    }

    return modifiedConfig
  },
  error => Promise.reject(error),
)

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const queryClient = useQueryClient()

    if (error.response?.status === 401) {
      localStorage.clear()
      queryClient.clear()
      router.replace('/')
    }
    return Promise.reject(error)
  },
)
