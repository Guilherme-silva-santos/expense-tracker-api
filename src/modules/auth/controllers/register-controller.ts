import { Elysia, t } from 'elysia'
import { RegisterUserUseCase } from '../use-case/register.use-case'
import { UserRepository } from '../../user/repositories/user-repository'
import { AuthRepository } from '../repositories/auth-repository'
import { UserWithTheSameEmailError } from '../use-case/errors/user-with-the-same-email-error'
import { RegisterUserDto } from '../dto/register-user-dto'

export const register = new Elysia().post(
  '/register',
  async ({ body, set }) => {
    const { name, email, password } = body

    try {
      const registerRepository = new AuthRepository()
      const userRepository = new UserRepository()

      const registerUserUseCase = new RegisterUserUseCase(
        userRepository,
        registerRepository
      )

      await registerUserUseCase.register({ name, email, password })

      set.status = 201
      return { message: 'User created successfully' }
    } catch (error) {
      if (error instanceof UserWithTheSameEmailError) {
        set.status = 409
        return { message: error.message }
      }

      throw error
    }
  },
  {
    body: RegisterUserDto,
  }
)
