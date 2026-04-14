import { Elysia } from 'elysia'
import { register } from './controllers/register-controller'
import { signIn } from './controllers/signIn-controller'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(register)
  .use(signIn)
