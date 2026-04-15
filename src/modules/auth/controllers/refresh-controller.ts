import { Elysia } from 'elysia'
import { AuthRepository } from '../repositories/auth-repository'
import { ElysiaJwtTokenService } from '../use-case/service/jwt'
import { t } from 'elysia'
import { RefreshUseCase } from '../use-case/refresh-use-case'

export const refresh = new Elysia().post(
  '/refresh',
  async ({ body, jwt }) => {
    const { refreshToken } = body

    const authRepository = new AuthRepository()
    const tokenService = new ElysiaJwtTokenService(jwt)

    const useCase = new RefreshUseCase(authRepository, tokenService)

    const result = await useCase.refresh(refreshToken)

    return result
  },
  {
    body: t.Object({
      refreshToken: t.String(),
    }),
  }
)
