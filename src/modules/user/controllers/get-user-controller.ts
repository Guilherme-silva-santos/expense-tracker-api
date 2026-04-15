import Elysia, { t } from 'elysia'
import { UserRepository } from '../../user/repositories/user-repository'
import { getUserDto } from '../../user/dto/get-user-dto'
import { UserNotFoundError } from '../../auth/use-case/errors/user-does-not-exists-error'

export const getUser = new Elysia()
  .decorate('userRepository', new UserRepository())
  .get(
    '/:id',
    async ({ params: { id }, userRepository }) => {
      const user = await userRepository.findById(id)

      if (!user) {
        throw new UserNotFoundError()
      }
      return user
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      response: { 200: getUserDto, 404: t.Object({ message: t.String() }) },
    }
  )
