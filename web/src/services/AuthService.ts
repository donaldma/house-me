import { API, resetAxiosInstance } from './constants'
import { IUserLogInResponse, User } from '../models/User'

export const AuthService = {
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<IUserLogInResponse> {
    const { data } = await API.post('/users/register', {
      firstName,
      lastName,
      email,
      password,
      phone: phone || undefined
    })
    saveAuthToken(data.authToken)
    return data
  },

  async login(email: string, password: string): Promise<IUserLogInResponse> {
    const { data } = await API.post('/users/login', { email, password })
    saveAuthToken(data.authToken)
    return data
  },

  async logout() {
    await API.post('/users/logout')
    clearAuthToken()
  },

  async getMe(): Promise<User> {
    const { data } = await API.get('/users/me')
    return data
  },

  async verifyEmailToken(token: string): Promise<void> {
    return await API.post('/users/email/verify', { token })
  },

  isAuthenticated() {
    return !!window.localStorage.getItem('token')
  }
}

function saveAuthToken(token: string) {
  window.localStorage.token = 'bearer ' + token
  resetAxiosInstance()
}

function clearAuthToken() {
  window.localStorage.clear()
  window.location.href = '/'
  resetAxiosInstance()
}
