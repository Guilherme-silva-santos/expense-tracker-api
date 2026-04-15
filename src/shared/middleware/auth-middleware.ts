import { Elysia } from 'elysia'
import { jwt } from '@elysiajs/jwt'

type JwtPayload = {
  id: string
  name: string
  email: string
}

export const authMiddleware = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET!,
    })
  )
  .derive({ as: 'scoped' }, async ({ jwt, request }) => {
    const auth = request.headers.get('authorization')
    const token = auth?.replace('Bearer ', '')
    const payload = token ? ((await jwt.verify(token)) as JwtPayload) : null

    return { user: payload }
  })
  .onBeforeHandle({ as: 'scoped' }, ({ user, set }) => {
    if (!user) {
      set.status = 401
      return { message: 'unauthorized' }
    }
  })
