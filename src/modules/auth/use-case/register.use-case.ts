import { User } from '../../../../generated/prisma/client'
import { UserRepositoriesMethods } from '../../user/repositories/user-repositories-methods'
import { AuthRepositoriesMethods } from '../repositories/auth-repositories-methods'
import { hash } from 'bcryptjs'
import { UserWithTheSameEmailError } from './errors/user-with-the-same-email-error'

interface RegisterRequest {
  name: string
  email: string
  password: string
}

interface RegisterServiceResponse {
  user: User
}
export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepositoriesMethods,
    private authRepository: AuthRepositoriesMethods
  ) {}

  async register({
    name,
    email,
    password,
  }: RegisterRequest): Promise<RegisterServiceResponse> {
    const passwordHash = await hash(password, 6)
    const userWithTheSameEmail = await this.userRepository.findByEmail(email)

    if (userWithTheSameEmail) {
      throw new UserWithTheSameEmailError()
    }

    const user = await this.authRepository.register({
      name,
      email,
      passwordHash,
    })

    return { user }
  }
}
