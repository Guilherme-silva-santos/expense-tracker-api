import { Prisma } from '../../../../generated/prisma/client'
import { prisma } from '../../../infra/database/prisma/client'
import { UserRepositoriesMethods } from './user-repositories-methods'

export class UserRepository implements UserRepositoriesMethods {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    })
    return user
  }
}
