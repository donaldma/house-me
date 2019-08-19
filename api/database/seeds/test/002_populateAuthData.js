const Constants = require('../../../dist/test/integration/utils/Constants').default

const authTokenTable = 'authToken'

exports.seed = async (knex) => {
  await knex(authTokenTable).del()

  const knexPromises = Object.keys(Constants.auth).map((key) =>
    knex(authTokenTable).insert(Constants.auth[key])
  )
  await Promise.all(knexPromises)
}
