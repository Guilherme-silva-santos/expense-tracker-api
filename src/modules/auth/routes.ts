import { Elysia } from 'elysia'
import { register } from './controllers/register-controller'
import { signIn } from './controllers/signIn-controller'
import { refresh } from './controllers/refresh-controller'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(register)
  .use(signIn)
  .use(refresh)
