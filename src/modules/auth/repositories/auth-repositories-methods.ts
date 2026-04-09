import { Prisma, User } from '../../../../generated/prisma/client'

export interface AuthRepositoriesMethods {
  register: (data: Prisma.UserCreateInput) => Promise<User>
}
