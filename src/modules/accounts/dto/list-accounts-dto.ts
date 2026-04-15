import { t } from 'elysia'

export const listAccountsFilterDto = t.Object({
  userId: t.String(),
  page: t.Number({ default: 1 }),
  limit: t.Number({ default: 10 }),
  isActive: t.Optional(t.Boolean()),
  name: t.Optional(t.String()),
})

export type listAccountsFilterDto = typeof listAccountsFilterDto.static
