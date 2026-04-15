import Elysia from 'elysia'
import { authMiddleware } from '../../shared/middleware/auth-middleware'

export const accountsRoutes = new Elysia({ prefix: '/accounts' }).use(
  authMiddleware
)
