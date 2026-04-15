import { Elysia, t } from 'elysia'
import { AuthRepository } from '../repositories/auth-repository'
import { SignOutUseCase } from '../use-case/signOut.use-case'

export const signOut = new Elysia()
  .decorate('authRepository', new AuthRepository())
  .post(
    '/sign-out',
    async ({ body, authRepository }) => {
      const { refreshToken } = body
      const useCase = new SignOutUseCase(authRepository)

      const result = await useCase.signOut(refreshToken)

      return result
    },
    {
      body: t.Object({
        refreshToken: t.String(),
      }),
    }
  )
