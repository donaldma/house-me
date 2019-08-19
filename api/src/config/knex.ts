import Knex from 'knex'
import { dbConfig } from './database'
import EnvironmentHelper from '../utils/EnvironmentHelper'

let knex: Knex
if (EnvironmentHelper.isProduction()) {
  knex = Knex(dbConfig.production)
}
if (EnvironmentHelper.isStaging()) {
  knex = Knex(dbConfig.staging)
}
if (EnvironmentHelper.isDevelopment()) {
  knex = Knex(dbConfig.development)
}
if (EnvironmentHelper.isTest()) {
  knex = Knex(dbConfig.test)
}
if (EnvironmentHelper.isTestLocal()) {
  knex = Knex(dbConfig.testLocal)
}

export default knex
