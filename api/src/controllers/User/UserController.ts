import { Router } from 'express'
import { AuthMiddleware } from '../../middleware/AuthMiddleware'
import { UserRegistrationRequest, UserLoginRequest, IUserEntity } from '../../models/User'
import { UserService } from '../../services/UserService'
import MeController from './MeController'

const router = Router()
export default router

router.use('/me', MeController)

router.post('/register', async (req, res, next) => {
  try {
    const request = new UserRegistrationRequest(req.body)
    const response = await UserService.register(request)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const logInRequest = new UserLoginRequest(req.body)
    const userResponse = await UserService.login(logInRequest)
    res.send(userResponse)
  } catch (error) {
    next(error)
  }
})

router.post('/logout', AuthMiddleware.isEmailUnverifiedLoggedIn, async (req, res, next) => {
  try {
    const user: IUserEntity = req.user
    await UserService.logout(user.id)
    res.send()
  } catch (error) {
    next(error)
  }
})
