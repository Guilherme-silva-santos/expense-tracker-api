import { Elysia, t } from 'elysia'
import { AuthRepository } from '../repositories/auth-repository'
import { SignOutUseCase } from '../use-case/signOut.use-case'

export const signOut = new Elysia().post(
  '/sign-out',
  async ({ body, set }) => {
    const { refreshToken } = body

    try {
      const authRepository = new AuthRepository()
      const useCase = new SignOutUseCase(authRepository)

      const result = await useCase.signOut(refreshToken)

      return result
    } catch (error) {
      set.status = 500
      return { message: 'Internal server error' }
    }
  },
  {
    body: t.Object({
      refreshToken: t.String(),
    }),
  }
)
