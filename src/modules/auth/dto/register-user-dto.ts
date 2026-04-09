import { t } from 'elysia'

export const RegisterUserDto = t.Object({
  name: t.String({ minLength: 2, maxLength: 100 }),
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 6, maxLength: 100 }),
})
