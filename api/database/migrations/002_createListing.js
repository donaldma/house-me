exports.up = async (knex) => {
  await knex.schema.createTable('listing', (table) => {
    table.increments('id').primary()
    table.string('title', 100).notNullable()
    table.string('location', 100)
    table.string('price', 100).notNullable()
    table.integer('beds')
    table.integer('sqft')
    table.string('listingUrl', 100).notNullable()
    table.string('imageUrl', 100).notNullable()
    table.timestamp('createDate', { useTz: true }).defaultTo(knex.fn.now())
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('listing')
}
