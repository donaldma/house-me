import { validateWithThrow, isUpdateRequired } from './Validation'
import { IsDefined, IsString, IsEmail, MinLength, IsOptional } from 'class-validator'

export interface IUserLogInResponse {
  user: User
  authToken: string
}

export interface IUserEntity {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  isEmailVerified: boolean
  isAdmin: boolean
  phone: string
  imageUrl: string
  createDate: Date
}

export class UserRegistrationRequest {
  @IsDefined()
  @IsString()
  firstName: string

  @IsDefined()
  @IsString()
  lastName: string

  @IsDefined()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string

  @IsDefined()
  @MinLength(8, { message: 'Your password must be at least 8 characters long' })
  password: string

  @IsOptional()
  @MinLength(10, { message: 'Please enter a valid 10 digit phone number' })
  phone: string

  @IsDefined()
  @IsString()
  imageUrl: string

  constructor(json: any) {
    this.firstName = json.firstName
    this.lastName = json.lastName
    this.email = json.email
    this.password = json.password
    this.phone = json.phone
    this.imageUrl = json.imageUrl || 'https://www.gravatar.com/avatar?d=mp&s=100'

    validateWithThrow(this)
  }
}

export class UserLoginRequest {
  @IsDefined()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string

  @IsDefined()
  @IsString()
  password: string

  constructor(json: any) {
    this.email = json.email
    this.password = json.password

    validateWithThrow(this)
  }
}

export class UserUpdateRequest {
  @IsString()
  firstName: string

  constructor(body: Partial<IUserEntity>) {
    this.firstName = body.firstName

    validateWithThrow(this)
  }

  requiresUpdate() {
    return isUpdateRequired(this)
  }
}

export class User {
  id: number
  firstName: string
  imageUrl: string
  email: string

  constructor(userEntity: IUserEntity) {
    this.id = userEntity.id
    this.firstName = userEntity.firstName
    this.imageUrl = userEntity.imageUrl
    this.email = userEntity.email
  }
}
