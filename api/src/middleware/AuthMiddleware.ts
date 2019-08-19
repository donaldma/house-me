import { Response, Request, NextFunction } from 'express'
import { NotAuthenticationError, NotAuthorizedError } from '../models/Error'

export const AuthMiddleware = {
  isEmailUnverifiedLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new NotAuthenticationError('You are not logged in')
      }
      next()
    } catch (error) {
      next(error)
    }
  },

  isEmailVerifiedLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new NotAuthenticationError('You are not logged in')
      }
      if (!req.user.isEmailVerified) {
        throw new NotAuthorizedError('Your email has not been verified yet')
      }
      next()
    } catch (error) {
      next(error)
    }
  },

  isAdminLoggedIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new NotAuthenticationError('You are not logged in')
      }
      if (!req.user.isAdmin) {
        throw new NotAuthorizedError('Must be an admin to access')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}
