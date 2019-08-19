import { Router } from 'express'
import { AuthMiddleware } from '../../middleware/AuthMiddleware'
import { User, UserUpdateRequest, IUserEntity } from '../../models/User'
import { UserService } from '../../services/UserService'

const router = Router()
export default router

router.get('/', AuthMiddleware.isEmailUnverifiedLoggedIn, async (req, res, next) => {
  try {
    const user = new User(req.user)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

router.patch('/', AuthMiddleware.isEmailUnverifiedLoggedIn, async (req, res, next) => {
  try {
    const user: IUserEntity = req.user
    const request = new UserUpdateRequest(req.body)
    const updatedUser = await UserService.update(user.id, request)
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})
