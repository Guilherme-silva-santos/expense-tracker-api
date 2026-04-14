import { compare } from 'bcryptjs'
import { AuthRepositoriesMethods } from '../repositories/auth-repositories-methods'
import { PasswordDoesNotMatchError } from './errors/password-does-not-match-error'
import { UserNotFoundError } from './errors/user-does-not-exists-error'
import { TokenService } from './service/jwt'

export class SignInUseCase {
  constructor(
    private authRepository: AuthRepositoriesMethods,
    private tokenService: TokenService
  ) {}
  async signIn(email: string, password: string) {
    const user = await this.authRepository.signIn(email)
    const userExists = !!user

    if (!userExists) {
      throw new UserNotFoundError()
    }

    const accessToken = await this.tokenService.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    const refreshToken = await this.tokenService.generateRefreshToken({
      id: user.id,
    })

    return { ...user, accessToken, refreshToken }
  }
}
