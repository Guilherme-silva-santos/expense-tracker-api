import { t } from 'elysia'

export const updateUserDto = t.Object({
  name: t.Optional(t.String()),
  email: t.Optional(t.String()),
})
