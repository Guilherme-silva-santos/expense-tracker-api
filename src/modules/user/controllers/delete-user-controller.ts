import Elysia, { t } from 'elysia'
import { UserRepository } from '../repositories/user-repository'

export const deleteUser = new Elysia()
  .decorate('userRepository', new UserRepository())
  .delete(
    '/:id',
    async ({ params: { id }, userRepository }) => {
      await userRepository.deleteUser(id)
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
