export interface TokenService {
  generateAccessToken(payload: {
    id: string
    name: string
    email: string
  }): Promise<string>

  generateRefreshToken(payload: { id: string }): Promise<string>

  verifyAccessToken(token: string): Promise<any>

  verifyRefreshToken(token: string): Promise<any>
}

export class ElysiaJwtTokenService implements TokenService {
  constructor(private jwt: any) {}

  async generateAccessToken(payload: {
    id: string
    name: string
    email: string
  }) {
    return await this.jwt.sign(payload, {
      exp: '15m',
    })
  }

  async generateRefreshToken(payload: { id: string }) {
    //sign can generate th token
    return await this.jwt.sign(payload, {
      exp: '7d',
    })
  }

  async verifyAccessToken(token: string) {
    return await this.jwt.verify(token)
  }

  async verifyRefreshToken(token: string) {
    return await this.jwt.verify(token)
  }
}
