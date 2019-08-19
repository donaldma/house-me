import knex from '../config/knex'
import { UserRegistrationRequest, IUserEntity, UserUpdateRequest } from '../models/User'
import { NotFoundError } from '../models/Error'

const userTable = 'user'

class UserRepository {
  async create(request: UserRegistrationRequest): Promise<number> {
    const [userId] = await knex(userTable)
      .insert(request)
      .returning('id')
    return userId
  }

  async update(userId: number, updateRequest: UserUpdateRequest): Promise<void> {
    await knex(userTable)
      .update(updateRequest)
      .where('id', userId)
  }

  async getById(userId: number): Promise<IUserEntity> {
    const userEntity: IUserEntity = await knex(userTable)
      .where('id', userId)
      .first()
    if (!userEntity) {
      throw new NotFoundError('user', 'User not found')
    }
    return userEntity
  }

  async getByEmail(email: string) {
    const userEntity: IUserEntity = await knex(userTable)
      .where('email', email)
      .first()
    return userEntity
  }

  async verifyEmail(userId: number): Promise<void> {
    await knex(userTable)
      .update({ isEmailVerified: true })
      .where('id', userId)
  }
}

const UserRepositoryInstance = new UserRepository()
export { UserRepositoryInstance as UserRepository }
