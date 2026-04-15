import { Prisma } from '../../../../generated/prisma/client'
import { prisma } from '../../../infra/database/prisma/client'
import { listAccountsFilterDto } from '../dto/list-accounts-dto'

export class AccountsRepository {
  async list({ userId, page, limit, isActive, name }: listAccountsFilterDto) {
    const offset = (page - 1) * limit
    const [accounts, total] = await Promise.all([
      prisma.account.findMany({
        where: {
          userId,
          isActive,
          name: {
            contains: name,
          },
        },
        skip: offset,
        take: limit,
      }),
      prisma.account.count({
        where: {
          userId,
          isActive,
          name: {
            contains: name,
          },
        },
      }),
    ])
    return {
      data: accounts,
      meta: {
        page,
        limit,
        totalpages: Math.ceil(total / limit),
      },
    }
  }

  async getAccount(id: string, userId: string) {
    const account = await prisma.account.findUnique({
      where: {
        id,
        userId,
      },
    })
    return account
  }

  async createAccount(data: Prisma.AccountCreateInput) {
    const account = await prisma.account.create({
      data,
    })
    return account
  }

  async updateAccount(id: string, data: Prisma.AccountUpdateInput) {
    const account = await prisma.account.update({
      where: {
        id,
      },
      data,
    })
    return account
  }

  async deleteAccount(id: string) {
    await prisma.account.delete({
      where: {
        id,
      },
    })
  }
}
