import { RequestHandler, Request, Response, NextFunction } from 'express'
import { AuthTokenService } from '../services/AuthTokenService'

const requestUserHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers['authorization'] as string | undefined

  if (authorizationHeader) {
    const bearerToken = authorizationHeader.replace('bearer ', '').replace('Bearer ', '')
    if (bearerToken) {
      try {
        req.user = await AuthTokenService.getUserFromToken(bearerToken)
        next()
      } catch (error) {
        next(error)
      }
    }
  } else {
    next()
  }
}

export default requestUserHandler
