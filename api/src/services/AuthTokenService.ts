import jwt from 'jsonwebtoken'
import { IUserEntity } from '../models/User'
import { UserRepository } from '../repositories/UserRepository'
import { TokenCreateRequest } from '../models/Token'
import { AuthTokenRepository } from '../repositories/TokenRepository'

interface IJwtObject {
  userId: number
  createDate: Date
}

export const privateKey = 'HouseMePrivateKeyForJWT'

class AuthTokenService {
  async create(userId: number): Promise<string> {
    const token = this.signToken(userId)
    const request = new TokenCreateRequest({ userId, token })

    await AuthTokenRepository.create(request)
    return token
  }

  async getUserFromToken(authToken: string): Promise<IUserEntity> {
    const authTokenEntity = await AuthTokenRepository.getByToken(authToken)

    return await UserRepository.getById(authTokenEntity.userId)
  }

  signToken(userId: number): string {
    return jwt.sign(
      {
        userId: userId,
        createDate: new Date()
      } as IJwtObject,
      privateKey
    )
  }
}

export const AuthTokenServiceInstance = new AuthTokenService()
export { AuthTokenServiceInstance as AuthTokenService }
