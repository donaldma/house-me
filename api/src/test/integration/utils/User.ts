import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import Constants from './Constants'
import Helpers from './Helpers'
import { IUserLogInResponse, User } from '../../../models/User'

chai.use(chaiHttp)

const isInstanceOfUser = (responseBody: User) => {
  expect(responseBody).have.property('id')
  expect(responseBody).have.property('firstName')
  expect(responseBody).have.property('imageUrl')
  expect(responseBody).have.property('email')
}

const patchMe = (request: any = {}, authToken: string) => {
  return chai
    .request(Constants.app)
    .patch('/api/users/me')
    .set('Authorization', authToken)
    .send(request)
}

const getMe = (authToken: string) => {
  return chai
    .request(Constants.app)
    .get('/api/users/me')
    .set('Authorization', authToken)
}

export default {
  isInstanceOfUserAuth: (responseBody: IUserLogInResponse) => {
    expect(responseBody).have.property('user')
    expect(responseBody).have.property('authToken')
    isInstanceOfUser(responseBody.user)
  },

  isInstanceOfUser: isInstanceOfUser,

  register: (overrides: any = {}) => {
    const defaultRequest = {
      email: `test${Helpers.generateUniqueId()}@test.com`,
      password: 'password',
      firstName: 'Test',
      lastName: 'Test',
      phone: '1234567890',
      ...overrides
    }
    const request = { ...defaultRequest, ...overrides }
    return chai
      .request(Constants.app)
      .post('/api/users/register')
      .send(request)
  },

  login: (overrides: any = {}) => {
    const defaultRequest = {
      email: 'user1@test.com',
      password: 'password',
      ...overrides
    }
    const request = { ...defaultRequest, ...overrides }
    return chai
      .request(Constants.app)
      .post('/api/users/login')
      .send(request)
  },

  logout: (authToken: string) => {
    return chai
      .request(Constants.app)
      .post('/api/users/logout')
      .set('Authorization', authToken)
  },

  logoutNoAuth: () => {
    return chai.request(Constants.app).post('/api/users/logout')
  },

  getMe: getMe,

  getMeNoAuth: () => {
    return chai.request(Constants.app).get('/api/users/me')
  },

  patchValidateRevert: async (authToken: string, key: any, valueToUpdate: any) => {
    const userRes: any = await getMe(authToken)

    // patch
    const res1 = await patchMe({ [key]: valueToUpdate }, authToken)
    Helpers.isResponseOk(res1)
    expect(res1.body[key]).to.be.equal(valueToUpdate)

    // revert
    const res2 = await patchMe({ [key]: userRes.body[key] }, authToken)
    Helpers.isResponseOk(res2)
    expect(res2.body[key]).to.be.equal(userRes.body[key])
  },

  patchMe: patchMe,

  patchMeNoAuth: () => {
    return chai.request(Constants.app).patch('/api/users/me')
  },

  verifyEmail: (request: any = {}) => {
    return chai
      .request(Constants.app)
      .post('/api/users/email/verify')
      .send(request)
  }
}
