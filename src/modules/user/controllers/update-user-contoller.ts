import Elysia, { t } from 'elysia'
import { UserRepository } from '../../user/repositories/user-repository'
import { UserNotFoundError } from '../../../shared/errors/user-not-found-error'
import { updateUserDto } from '../dto/update-user-dto'

export const updateUser = new Elysia()
  .decorate('userRepository', new UserRepository())
  .patch(
    '/:id',
    async ({ params: { id }, body, userRepository }) => {
      const user = await userRepository.updateUser(id, body)

      if (!user) {
        throw new UserNotFoundError()
      }

      return user
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: updateUserDto,
      response: { 200: updateUserDto, 404: t.Object({ message: t.String() }) },
    }
  )
