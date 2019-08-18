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

export interface User {
  id: number
  firstName: string
  imageUrl: string
  email: string
}
