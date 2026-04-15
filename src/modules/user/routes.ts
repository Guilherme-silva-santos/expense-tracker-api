import Elysia from 'elysia'
import { findUserByemail } from './controllers/find-user-by-email-controller'
import { authMiddleware } from '../../shared/middleware/auth-middleware'
import { getUser } from './controllers/get-user-controller'
import { updateUser } from './controllers/update-user-contoller'
import { deleteUser } from './controllers/delete-user-controller'

export const userRoutes = new Elysia({ prefix: '/users' })
  .use(authMiddleware)
  .use(findUserByemail)
  .use(getUser)
  .use(updateUser)
  .use(deleteUser)
