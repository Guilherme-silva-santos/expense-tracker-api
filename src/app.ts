import { Elysia } from 'elysia'
import { authRoutes } from './modules/auth/routes'

export const app = new Elysia()

app.use(authRoutes)

app.listen(3000)

console.log(` 🟢 Server running http://localhost:3000`)
