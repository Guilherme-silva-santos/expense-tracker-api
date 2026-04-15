import { t } from 'elysia'

export const getUserDto = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
})
