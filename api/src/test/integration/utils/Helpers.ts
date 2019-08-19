import { expect } from 'chai'
import DateHelper from '../../../utils/DateHelper'

const createStartEndDates = (daysToAdd: number = 0) => {
  return {
    startDate: DateHelper.getFormattedDate(undefined, daysToAdd),
    endDate: DateHelper.getFormattedDate(undefined, daysToAdd + 1)
  }
}

export default {
  isResponseOk: (res: ChaiHttp.Response) => {
    expect(res).have.status(200)
    expect(res).be.json
  },

  createStartEndDates: createStartEndDates,

  createUser: (userId: number) => {
    return {
      email: `user${userId}@test.com`,
      password: '$2b$10$yS6inK3OhYl4c.gLfWNPuuQLNDZyUu5AxzLk0yVSCkQy.D.j9s5Pe',
      firstName: `user${userId}`,
      lastName: `user${userId}`,
      imageUrl: ''
    }
  },

  createHelper: (userId: number) => {
    return {
      email: `helper${userId}@test.com`,
      password: '$2b$10$yS6inK3OhYl4c.gLfWNPuuQLNDZyUu5AxzLk0yVSCkQy.D.j9s5Pe',
      firstName: `helper${userId}`,
      lastName: `helper${userId}`,
      imageUrl: ''
    }
  },

  createAuth: (userId: number, token: string) => {
    return {
      userId,
      token
    }
  },

  generateUniqueId: () => {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    )
  }
}
