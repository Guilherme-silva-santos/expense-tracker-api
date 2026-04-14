import { Elysia } from 'elysia'
import { authRoutes } from './modules/auth/routes'
import openapi from '@elysiajs/openapi'
import { jwt } from '@elysiajs/jwt'

export const app = new Elysia()

app.use(
  openapi({
    documentation: {
      info: {
        title: 'Expense Tracker API',
        description: 'API para gerenciamento de despesas com autenticação JWT',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },

    swagger: {
      docExpansion: 'none',
      persistAuthorization: true,
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  })
)
app.use(
  jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET!,
  })
)
app.use(authRoutes)

app.listen(3000)

console.log(` 🟢 Server running http://localhost:3000`)
