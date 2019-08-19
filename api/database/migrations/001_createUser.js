exports.up = async (knex) => {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary()
    table
      .string('email', 100)
      .unique()
      .notNullable()
    table.boolean('isEmailVerified').defaultTo(false)
    table.boolean('isAdmin').defaultTo(false)
    table.string('firstName', 100)
    table.string('lastName', 100)
    table.string('password', 100).notNullable()
    table.string('phone', 15)
    table.string('imageUrl').notNullable()
    table.timestamp('createDate', { useTz: true }).defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('authToken', (table) => {
    table
      .integer('userId')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade')
    table
      .string('token')
      .notNullable()
      .unique()
    table.timestamp('createDate', { useTz: true }).defaultTo(knex.fn.now())
    table.primary(['userId', 'token'])
  })

  await knex.schema.createTable('emailVerification', (table) => {
    table
      .integer('userId')
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete('cascade')
    table
      .string('token')
      .notNullable()
      .unique()
    table.timestamp('createDate', { useTz: true }).defaultTo(knex.fn.now())
    table.primary(['userId', 'token'])
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('emailVerification')
  await knex.schema.dropTableIfExists('authToken')
  await knex.schema.dropTableIfExists('user')
}
