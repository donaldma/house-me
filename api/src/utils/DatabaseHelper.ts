import { ConnectionConfig } from 'knex'
import { dbConfig } from '../config/database'
import knex from '../config/knex'

export default {
  resetDatabase: async () => {
    // Only ever wipe out localhost or test databases, NEVER production
    const connection = knex.client.config.connection as ConnectionConfig
    const prod = dbConfig.production.connection as ConnectionConfig

    if (connection.host == prod.host) {
      throw new Error('Cannot reset production database')
    }

    console.log('Init database:', connection.database)
    // sanity check
    await knex.migrate.rollback()
    await knex.migrate.latest()
    await knex.migrate.rollback()
    console.log('Migrating and seeding database')
    await knex.migrate.latest()
    await knex.seed.run()
    console.log('Done')
    process.exit()
  }
}
