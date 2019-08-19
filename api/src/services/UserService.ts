import bcrypt from 'bcrypt'
import { AuthTokenService } from './AuthTokenService'
import {
  UserRegistrationRequest,
  IUserLogInResponse,
  UserLoginRequest,
  User,
  UserUpdateRequest
} from '../models/User'
import { UserRepository } from '../repositories/UserRepository'
import { ArgumentError, NotAuthorizedError } from '../models/Error'
import { AuthTokenRepository } from '../repositories/TokenRepository'

class UserService {
  async register(registerRequest: UserRegistrationRequest): Promise<IUserLogInResponse> {
    const userEntity = await UserRepository.getByEmail(registerRequest.email)
    if (userEntity) {
      throw new ArgumentError('email', `User with email: ${userEntity.email} already exists`)
    }

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(registerRequest.password, salt)
    const newRegisterRequest = {
      ...registerRequest,
      password: hashedPassword
    }

    const userId = await UserRepository.create(newRegisterRequest)
    const user = await this.getById(userId)
    const token = await AuthTokenService.create(user.id)

    return {
      user,
      authToken: token
    }
  }

  async login(logInRequest: UserLoginRequest): Promise<IUserLogInResponse> {
    const userEntity = await UserRepository.getByEmail(logInRequest.email)
    if (!userEntity) {
      throw new ArgumentError('email', `No user found with email: ${logInRequest.email}`)
    }
    if (!bcrypt.compareSync(logInRequest.password, userEntity.password)) {
      throw new NotAuthorizedError('Invalid credentials')
    }

    const user = new User(userEntity)
    const token = await AuthTokenService.create(userEntity.id)

    return {
      user,
      authToken: token
    }
  }

  async logout(userId: number): Promise<void> {
    await AuthTokenRepository.deleteByUserId(userId)
  }

  async update(userId: number, request: UserUpdateRequest): Promise<User> {
    if (request.requiresUpdate()) {
      await UserRepository.update(userId, request)
    }
    return this.getById(userId)
  }

  async getById(userId: number): Promise<User> {
    const userEntity = await UserRepository.getById(userId)
    return new User(userEntity)
  }
}

const UserServiceInstance = new UserService()
export { UserServiceInstance as UserService }
