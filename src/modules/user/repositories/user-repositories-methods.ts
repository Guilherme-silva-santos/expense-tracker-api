import { User } from '../../../../generated/prisma/client'

export interface UserRepositoriesMethods {
  findByEmail: (email: string) => Promise<User | null>
}
