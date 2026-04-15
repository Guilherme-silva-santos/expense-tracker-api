import Elysia from 'elysia'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from '../../../shared/errors/user-not-found-error'

export const findUserByemail = new Elysia().get(
  '/email/:email',
  async ({ params, set }) => {
    const { email } = params

    try {
      const userRepository = new UserRepository()
      const user = await userRepository.findByEmail(email)

      if (!user) {
        set.status = 404
        return new UserNotFoundError()
      }
      return user
    } catch (error) {
      throw error
    }
  }
)
