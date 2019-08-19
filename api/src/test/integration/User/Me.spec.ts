import { expect } from 'chai'
import User from '../utils/User'
import Helpers from '../utils/Helpers'
import TestConstants from '../utils/Constants'

describe('GET /users/me', () => {
  it('throws an error if no auth token is provided in request', async () => {
    const res = await User.getMeNoAuth()
    expect(res).have.status(401)
  })
  it('get me user successfully', async () => {
    const res1 = await User.register()
    Helpers.isResponseOk(res1)
    User.isInstanceOfUserAuth(res1.body)
    const res2 = await User.getMe(res1.body.authToken)
    Helpers.isResponseOk(res2)
    User.isInstanceOfUser(res2.body)
  })
})

describe('PATCH /users/me', () => {
  it('throws an error if no auth token is provided in request', async () => {
    const res = await User.patchMeNoAuth()
    expect(res).have.status(401)
  })
  it('throws an error if firstName is not a string', async () => {
    const res = await User.patchMe({ firstName: 123 }, TestConstants.auth.user1AuthData.token)
    expect(res).have.status(400)
  })
  it('updates firstName successfully', async () => {
    await User.patchValidateRevert(TestConstants.auth.user1AuthData.token, 'firstName', 'newName')
  })
})
