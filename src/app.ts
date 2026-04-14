import { Elysia } from 'elysia'
import { authRoutes } from './modules/auth/routes'
import openapi from '@elysiajs/openapi'
import { jwt } from '@elysiajs/jwt'

export const app = new Elysia()

app.use(openapi())
app.use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!,
  })
)
app.use(authRoutes)

app.listen(3000)

console.log(` 🟢 Server running http://localhost:3000`)
