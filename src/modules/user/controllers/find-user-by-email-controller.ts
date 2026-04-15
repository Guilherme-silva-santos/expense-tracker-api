import Elysia, { t } from 'elysia'
import { UserRepository } from '../repositories/user-repository'
import { UserNotFoundError } from '../../../shared/errors/user-not-found-error'
import { getUserDto } from '../dto/get-user-dto'

export const findUserByemail = new Elysia()
  .decorate('userRepository', new UserRepository())
  .get(
    '/email/:email',
    async ({ params, set, userRepository }) => {
      const { email } = params

      const user = await userRepository.findByEmail(email)

      if (!user) {
        set.status = 404
        return new UserNotFoundError()
      }
      return user
    },
    {
      params: t.Object({
        email: t.String(),
      }),
      response: {
        200: getUserDto,
        404: t.Object({ message: t.String() }),
      },
    }
  )
