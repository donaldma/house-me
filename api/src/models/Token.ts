import { IsDefined, IsNumber, IsString } from 'class-validator'
import { validateWithThrow } from './Validation'

export interface ITokenEntity {
  id: number
  userId: number
  token: string
  createDate: Date
}

export class TokenCreateRequest {
  @IsDefined()
  @IsNumber()
  userId: number

  @IsDefined()
  @IsString()
  token: string

  constructor(body: Partial<ITokenEntity>) {
    this.userId = body.userId
    this.token = body.token

    validateWithThrow(this)
  }
}
