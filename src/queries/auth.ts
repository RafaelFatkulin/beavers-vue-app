import type { SuccessResponse } from '@/lib/api'
import { getCurrentUser, type CurrentUser } from '@/services/auth'
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query'

export const useGetCurrentUserQuery: () => UseQueryReturnType<
  SuccessResponse<CurrentUser>,
  Error
> = () => {
  return useQuery({
    queryKey: ['auth', 'current-user'],
    queryFn: getCurrentUser,
  })
}
