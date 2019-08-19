import { expect } from 'chai'
import User from '../utils/User'
import Helpers from '../utils/Helpers'

describe('POST /users/register', () => {
  it('throws an error if firstName is not a string', async () => {
    const res = await User.register({ firstName: 123 })
    expect(res).have.status(400)
  })
  it('throws an error if lastName is not a string', async () => {
    const res = await User.register({ lastName: 123 })
    expect(res).have.status(400)
  })
  it('throws an error if email is not valid', async () => {
    // not a string
    const res1 = await User.register({ email: 123 })
    expect(res1).have.status(400)
    // no @
    const res2 = await User.register({ email: 'test' })
    expect(res2).have.status(400)
    // no domain
    const res3 = await User.register({ email: 'test@test' })
    expect(res3).have.status(400)
  })
  it('throws an error if password is not at least 8 characters', async () => {
    const res = await User.register({ password: '1234567' })
    expect(res).have.status(400)
  })
  it('throws an error if phone exists and is not 10 digits', async () => {
    const res = await User.register({ phone: '123456789' })
    expect(res).have.status(400)
  })
  it('throws an error if user with email already exists', async () => {
    const res = await User.register({ email: 'user1@test.com' })
    expect(res).have.status(400)
  })
  it('registers a user successfully', async () => {
    const res = await User.register()
    Helpers.isResponseOk(res)
    User.isInstanceOfUserAuth(res.body)
  })
})

describe('POST /users/login', () => {
  it('throws an error if email is not valid', async () => {
    // not a string
    const res1 = await User.login({ email: 123 })
    expect(res1).have.status(400)
    // no @
    const res2 = await User.login({ email: 'test' })
    expect(res2).have.status(400)
    // no domain
    const res3 = await User.login({ email: 'test@test' })
    expect(res3).have.status(400)
  })
  it('throws an error if no user found with provided email', async () => {
    const res = await User.login({ email: 'whoAreYou@test.com' })
    expect(res).have.status(400)
  })
  it('throws an error if user credentials are incorrect', async () => {
    const res = await User.login({ email: 'user1@test.com', password: 'wrongPasswordEh' })
    expect(res).have.status(403)
  })
  it('login successfully', async () => {
    const res = await User.login()
    Helpers.isResponseOk(res)
    User.isInstanceOfUserAuth(res.body)
  })
})

describe('POST /users/logout', () => {
  it('throws an error if no auth token is provided in request', async () => {
    const res = await User.logoutNoAuth()
    expect(res).have.status(401)
  })
  it('throws an error if no user is found with provided token', async () => {
    const res = await User.logout('hi')
    expect(res).have.status(404)
  })
  it('logout successfully', async () => {
    const res1 = await User.register()
    Helpers.isResponseOk(res1)
    User.isInstanceOfUserAuth(res1.body)
    const res2 = await User.logout(res1.body.authToken)
    expect(res2).have.status(200)
  })
})
