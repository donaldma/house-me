import { ArgumentError, NotAuthenticationError, NotFoundError, NotAuthorizedError } from '../models/Error'
import * as Express from 'express'
import EnvironmentHelper from '../utils/EnvironmentHelper'

const errorRequestHandler: Express.ErrorRequestHandler = (error, req, res, next) => {
  if (!error) {
    return next()
  }

  if (!EnvironmentHelper.isTestInstance()) {
    console.log(error)
  }

  if (error instanceof ArgumentError) {
    // TODO HARRY - Logger
    res.status(400).send({ message: error.message })
  } else if (error instanceof NotAuthenticationError) {
    // TODO HARRY - Logger
    res.status(401).send({ message: error.message })
  } else if (error instanceof NotFoundError) {
    // TODO HARRY - Logger
    res.status(404).send({ message: error.message })
  } else if (error instanceof NotAuthorizedError) {
    // TODO HARRY - Logger
    res.status(403).send({ message: error.message })
  } else {
    // TODO HARRY - Logger
    res.status(500).send(error)
  }
}

export default errorRequestHandler
