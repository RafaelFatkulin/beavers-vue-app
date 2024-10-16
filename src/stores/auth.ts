import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const accessToken: RemovableRef<string> = useLocalStorage('access_token', '')
  const refreshToken: RemovableRef<string> = useLocalStorage(
    'refresh_token',
    '',
  )

  const updateAccessToken = (value: string) => {
    accessToken.value = value
  }

  const updateRefreshToken = (value: string) => {
    refreshToken.value = value
  }

  const $reset = () => {
    accessToken.value = ''
    refreshToken.value = ''
  }

  return {
    accessToken,
    refreshToken,
    updateAccessToken,
    updateRefreshToken,
    $reset,
  }
})
