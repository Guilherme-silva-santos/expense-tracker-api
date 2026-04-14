import { t } from 'elysia'

export const SignInDto = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6, maxLength: 100 }),
})
