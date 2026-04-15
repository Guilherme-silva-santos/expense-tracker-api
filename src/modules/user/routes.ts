import Elysia from 'elysia'
import { findUserByemail } from './controllers/find-user-by-email-controller'
import { authMiddleware } from '../../shared/middleware/auth-middleware'

export const userRoutes = new Elysia({ prefix: '/users' })
  .use(authMiddleware)
  .use(findUserByemail)
