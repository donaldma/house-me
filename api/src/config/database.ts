import Knex from 'knex'
import DateHelper from '../utils/DateHelper'

interface IDbConfig {
  development: Knex.Config
  staging: Knex.Config
  production: Knex.Config
  test: Knex.Config
  testLocal: Knex.Config
}

const typeCast = (field: any, next: () => void) => {
  if (field.type == 'DATE') {
    return DateHelper.getFormattedDate(field.string())
  }
  return next()
}

const envMethodConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: 'utf8',
    timezone: 'UTC',
    typeCast
  },
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds/app'
  }
}

/**
 * if you need to add extra config just spread it
 * ex.
 * production: { ...envMethodConfig, client: 'blah' }
 */
const dbConfig: IDbConfig = {
  development: envMethodConfig,
  staging: {
    ...envMethodConfig,
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: { min: 1, max: 20 }
  },
  production: {
    ...envMethodConfig,
    connection: process.env.DATABASE_URL + '?ssl=true',
    pool: { min: 1, max: 20 }
  },
  test: {
    ...envMethodConfig,
    connection:
      'postgres://svyhyqzj:qoVJtJUlAVLXZ5AmSuVJq8ZgMVREfAXC@raja.db.elephantsql.com:5432/svyhyqzj?ssl=true',
    seeds: {
      directory: './database/seeds/test'
    }
  },
  testLocal: {
    ...envMethodConfig,
    connection: {
      host: '127.0.0.1',
      user: 'donaldma',
      password: 'password',
      database: 'house-me-test',
      charset: 'utf8',
      timezone: 'UTC',
      typeCast
    },
    seeds: {
      directory: './database/seeds/test'
    }
  }
}

export { dbConfig }
