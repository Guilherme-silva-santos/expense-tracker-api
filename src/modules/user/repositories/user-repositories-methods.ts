import { Prisma, User } from '../../../../generated/prisma/client'

export interface UserRepositoriesMethods {
  findByEmail: (email: string) => Promise<User | null>
  list: () => Promise<User[]>
  findById: (id: string) => Promise<User | null>
  deleteUser: (id: string) => Promise<void>
  updateUser: (id: string, data: Prisma.UserUpdateInput) => Promise<User>
}
