import Elysia from 'elysia'
import { AuthRepository } from '../repositories/auth-repository'
import { SignInUseCase } from '../use-case/signIn.use-case'
import { ElysiaJwtTokenService } from '../use-case/service/jwt'
import { SignInDto } from '../dto/signIn-dto'

export const signIn = new Elysia().post(
  '/sign-in',
  async ({ body, jwt }) => {
    const { email, password } = body

    const authRepository = new AuthRepository()
    const tokenService = new ElysiaJwtTokenService(jwt)

    const signInUseCase = new SignInUseCase(authRepository, tokenService)

    const result = await signInUseCase.signIn(email, password)

    return result
  },
  {
    body: SignInDto,
  }
)
