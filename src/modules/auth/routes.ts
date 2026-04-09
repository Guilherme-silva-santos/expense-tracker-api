import { Elysia } from 'elysia'
import { register } from './controllers/register-controller'

export const authRoutes = new Elysia({ prefix: '/auth' }).use(register)
