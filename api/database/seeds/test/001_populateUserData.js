const Constants = require('../../../dist/test/integration/utils/Constants').default

const userTable = 'user'

exports.seed = async (knex) => {
  await knex(userTable).del()

  const knexPromises = Object.keys(Constants.user).map((key) => knex(userTable).insert(Constants.user[key]))
  await Promise.all(knexPromises)
}
