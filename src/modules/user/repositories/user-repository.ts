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
}
