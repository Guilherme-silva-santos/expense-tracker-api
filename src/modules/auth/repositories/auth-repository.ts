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
}
