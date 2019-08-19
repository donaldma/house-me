import knex from '../config/knex'
import { NotFoundError } from '../models/Error'
import { TokenCreateRequest, ITokenEntity } from '../models/Token'

const authTokenTable = 'authToken'
const emailVerificationTable = 'emailVerification'

export class TokenRepository {
  tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  async create(request: TokenCreateRequest): Promise<void> {
    await knex(this.tableName).insert(request)
  }

  async getByToken(token: string): Promise<ITokenEntity> {
    const tokenEntity = await knex(this.tableName)
      .where('token', token)
      .first()

    if (!tokenEntity) {
      throw new NotFoundError('token', 'Token not found')
    }

    return tokenEntity
  }

  async getByUserId(userId: number): Promise<ITokenEntity> {
    const tokenEntity = await knex(this.tableName)
      .where('userId', userId)
      .first()

    return tokenEntity
  }

  async deleteByUserId(userId: number): Promise<void> {
    await knex(this.tableName)
      .del()
      .where('userId', userId)
  }
}

export const AuthTokenRepository = new TokenRepository(authTokenTable)
export const EmailVerificationRepository = new TokenRepository(emailVerificationTable)
