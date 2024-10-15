import { toast } from '@/components/ui/toast'
import type { SuccessResponse } from '@/lib/api'
import router from '@/router'
import {
  getCurrentUser,
  type CurrentUser,
  signIn,
  type SignInResponse,
  type SignIn,
  refresh,
} from '@/services/auth'
import { useAuthStore } from '@/stores/auth'
import {
  useMutation,
  useQuery,
  type UseMutationReturnType,
  type UseQueryReturnType,
  QueryClient,
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
  Error,
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
        toast({
          title: data.value?.data.fullName,
        })

        router.replace('/about')
      }
    },
    onError(error, variables, context) {
      toast({
        title: error.response.data.message,
      })
    },
  })
}
