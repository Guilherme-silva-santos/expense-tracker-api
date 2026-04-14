import { Prisma, User, RefreshToken } from '../../../../generated/prisma/client'

export interface AuthRepositoriesMethods {
  register: (data: Prisma.UserCreateInput) => Promise<User>
  signIn: (email: string) => Promise<User | null>

  saveRefreshToken: (data: {
    userId: string
    token: string
    expiresAt: Date
  }) => Promise<void>

  findRefreshTokenByUserId: (userId: string) => Promise<RefreshToken[]>

  deleteRefreshToken: (token: string) => Promise<void>
}
