import { useAuthStore } from '@/stores/auth'
import { QueryClient, useQueryClient } from '@tanstack/vue-query'
import axios, { AxiosError } from 'axios'

import { effectScope } from 'vue'

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

const queryClient = new QueryClient()

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
  (error: AxiosError) => {
    console.log(error)
    console.log(error.response?.status)

    if (error.response?.status === 401) {
      const scope = effectScope()

      scope.run(async () => {
        console.log('gere')

        localStorage.clear()

        queryClient.clear()
      })

      scope.stop()
    }
    return Promise.reject(error)
  },
)
