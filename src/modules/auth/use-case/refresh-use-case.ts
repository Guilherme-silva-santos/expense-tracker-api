import { AuthRepositoriesMethods } from '../repositories/auth-repositories-methods'
import { TokenService } from './service/jwt'
import { compare } from 'bcryptjs'

export class RefreshUseCase {
  constructor(
    private authRepository: AuthRepositoriesMethods,
    private tokenService: TokenService
  ) {}

  async refresh(refreshToken: string) {
    const payload = await this.tokenService.verifyRefreshToken(refreshToken)

    const storedTokens = await this.authRepository.findRefreshTokenByUserId(
      payload.id
    )

    const validToken = await Promise.all(
      storedTokens.map(async (token) => {
        const match = await compare(refreshToken, token.token)
        return match ? token : null
      })
    )

    const tokenFound = validToken.find((t) => t !== null)

    if (!tokenFound) {
      throw new Error('Invalid refresh token')
    }

    const newAccessToken = await this.tokenService.generateAccessToken({
      id: payload.id,
      name: payload.name,
      email: payload.email,
    })

    return {
      accessToken: newAccessToken,
    }
  }
}
