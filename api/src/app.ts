import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import lusca from 'lusca'
import expressValidator from 'express-validator'
import RateLimit from 'express-rate-limit'
// @ts-ignore
import knexLogger from 'knex-logger'
import cron from 'node-cron'
import axios from 'axios'
import path from 'path'

import ApiController from './controllers/ApiController'

import RequestErrorHandler from './middleware/RequestErrorHandler'
import RequestUserHandler from './middleware/RequestUserHandler'

import knex from './config/knex'
import EnvironmentHelper from './utils/EnvironmentHelper'

// Create Express server
const app = express()

// rate limiter (100 requests every 15 minutes per IP)
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    res.status(429).send({ message: 'Too many requests, please try again later.' })
  }
})

// Express configuration
app.set('port', process.env.PORT || 3001)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, access_token, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  next()
})

app.use(RequestUserHandler)

if (!EnvironmentHelper.isTestInstance()) {
  app.use(limiter)
}

if (EnvironmentHelper.isDevelopment()) {
  app.use(knexLogger(knex))
}

app.use('/api', ApiController)

app.use(RequestErrorHandler)

if (EnvironmentHelper.isProduction()) {
  cron.schedule('*/15 * * * *', () => {
    console.log('Ping App')
    axios.get('https://get-house-me.herokuapp.com/')
  })
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/../../web/build')))
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../web/build', 'index.html'))
  })
}

export default app
