import { api, type SuccessResponse } from '@/lib/api'
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type SignIn = z.infer<typeof signInSchema>
export type SignInResponse = {
  accessToken: string
  refreshToken: string
}
export type CurrentUser = {
  id: number
  fullName: string | null
  email: string
  phone: string | null
  avatar: string | null
  role: 'ADMIN' | 'LOGISTICIAN' | 'MANAGER'
}

export const signIn = async ({ email, password }: SignIn) => {
  const response = await api.post<SuccessResponse<SignInResponse>>(
    '/auth/signin',
    {
      email,
      password,
    },
  )

  return response.data
}

export const refresh = async ({ refreshToken }: { refreshToken: string }) => {
  const response =
    await api.post<SuccessResponse<SignInResponse>>('/auth/refresh')

  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get<SuccessResponse<CurrentUser>>('/auth/me')
  return response.data
}
