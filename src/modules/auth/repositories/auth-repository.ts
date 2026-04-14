import { Prisma } from '../../../../generated/prisma/client'
import { prisma } from '../../../infra/database/prisma/client'
import { AuthRepositoriesMethods } from './auth-repositories-methods'

export class AuthRepository implements AuthRepositoriesMethods {
  async register(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async signIn(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async saveRefreshToken(data: {
    userId: string
    token: string
    expiresAt: Date
  }) {
    await prisma.refreshToken.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
      },
    })
  }

  async findRefreshToken(token: string) {
    return await prisma.refreshToken.findFirst({
      where: {
        token,
      },
    })
  }

  async deleteRefreshToken(token: string) {
    await prisma.refreshToken.deleteMany({
      where: {
        token,
      },
    })
  }
  async findRefreshTokenByUserId(userId: string) {
    return await prisma.refreshToken.findMany({
      where: {
        userId,
      },
    })
  }
}
