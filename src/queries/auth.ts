import { toast } from '@/components/ui/toast'
import type { ErrorResponse, SuccessResponse } from '@/lib/api'
import { queryClient } from '@/lib/utils'
import router from '@/router'
import {
  getCurrentUser,
  type CurrentUser,
  signIn,
  type SignInResponse,
  type SignIn,
  signOut,
} from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import {
  useMutation,
  useQuery,
  type UseMutationReturnType,
  type UseQueryReturnType,
} from '@tanstack/vue-query'

export const useGetCurrentUserQuery: () => UseQueryReturnType<
  SuccessResponse<CurrentUser>,
  Error
> = () => {
  const authStore = useAuthStore()

  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: getCurrentUser,
    enabled: !!authStore.accessToken,
  })
}

export const useSignInMutation: () => UseMutationReturnType<
  SuccessResponse<SignInResponse>,
  ErrorResponse,
  SignIn,
  unknown
> = () => {
  const { data, refetch, isSuccess } = useGetCurrentUserQuery()
  const authStore = useAuthStore()

  return useMutation({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: signIn,
    onSuccess: async ({ data: signData }) => {
      authStore.updateAccessToken(signData.accessToken)
      authStore.updateRefreshToken(signData.refreshToken)

      await refetch()

      if (data.value?.data) {
        router.replace('/dashboard')
      }
    },
    onError(error) {
      if (error.code === 'ERR_NETWORK') {
        return toast({
          title: 'Ошибка подключения',
          variant: 'destructive',
        })
      }

      toast({
        title: error?.response?.data.message as string,
        variant: 'destructive',
      })
    },
  })
}

export const useSignOutMutation: () => UseMutationReturnType<
  SuccessResponse<null>,
  ErrorResponse,
  { refreshToken: string },
  unknown
> = () => {
  const authStore = useAuthStore()

  return useMutation({
    mutationKey: ['auth', 'sign-out'],
    mutationFn: async () =>
      await signOut({ refreshToken: authStore.refreshToken }),
    onSuccess: async ({ message }) => {
      authStore.$reset()
      localStorage.clear()
      queryClient.removeQueries()
      await router.replace('/sign-in')
    },
    onError(error) {
      toast({
        title: error?.response?.data.message as string,
      })
    },
  })
}
