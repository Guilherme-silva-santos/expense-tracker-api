import { compare, hash } from 'bcryptjs'
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

    if (!user) {
      throw new UserNotFoundError()
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      throw new PasswordDoesNotMatchError()
    }

    const accessToken = await this.tokenService.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    const refreshToken = await this.tokenService.generateRefreshToken({
      id: user.id,
    })

    const hashedRefreshToken = await hash(refreshToken, 6)

    await this.authRepository.saveRefreshToken({
      userId: user.id,
      token: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}
