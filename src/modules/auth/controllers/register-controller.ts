import { Elysia, t } from 'elysia'
import { RegisterUserUseCase } from '../use-case/register.use-case'
import { UserRepository } from '../../user/repositories/user-repository'
import { AuthRepository } from '../repositories/auth-repository'
import { UserWithTheSameEmailError } from '../use-case/errors/user-with-the-same-email-error'
import { RegisterUserDto } from '../dto/register-user-dto'

export const register = new Elysia()
  .decorate('userRepository', new UserRepository())
  .decorate('authRepository', new AuthRepository())
  .post(
    '/register',
    async ({ body, set, userRepository, authRepository }) => {
      const { name, email, password } = body

      const registerUserUseCase = new RegisterUserUseCase(
        userRepository,
        authRepository
      )

      await registerUserUseCase.register({ name, email, password })

      set.status = 201
      return { message: 'User created successfully' }
    },
    {
      body: RegisterUserDto,
    }
  )
