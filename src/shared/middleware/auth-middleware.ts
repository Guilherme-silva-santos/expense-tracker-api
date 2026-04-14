type JwtPayload = {
  id: string
  name: string
  email: string
}

export const authMiddleware = async ({
  jwt,
  request,
  set,
}: {
  jwt: any
  request: Request
  set: { status?: number }
}) => {
  const auth = request.headers.get('authorization')

  if (!auth) {
    set.status = 401
    throw new Error('user not authenticated')
  }

  const token = auth.replace('Bearer ', '')

  try {
    const payload = (await jwt.verify(token)) as JwtPayload

    return {
      user: payload,
    }
  } catch {
    set.status = 401
    throw new Error('invalid token')
  }
}
