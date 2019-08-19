require('dotenv').config({ path: __dirname + '/../.env' })

import knex from './config/knex'
import app from './app'

/**
 * Start Express server.
 */

knex.migrate.latest().then((result) => {
  knex.seed.run().then(() => {
    app.listen(app.get('port'), () => {
      console.log('App is running at port %d in %s mode', app.get('port'), app.get('env'))
    })
  })
})
