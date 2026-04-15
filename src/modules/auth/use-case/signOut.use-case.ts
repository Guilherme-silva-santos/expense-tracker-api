import { AuthRepositoriesMethods } from '../repositories/auth-repositories-methods'

export class SignOutUseCase {
  constructor(private authRepository: AuthRepositoriesMethods) {}

  async signOut(refreshToken: string) {
    await this.authRepository.deleteRefreshToken(refreshToken)

    return {
      success: true,
    }
  }
}
