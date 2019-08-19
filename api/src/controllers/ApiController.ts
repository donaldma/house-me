import { Router } from 'express'
import UserController from './User/UserController'
import ListingController from './ListingController'

const router = Router()
export default router

/**
 * Primary app routes.
 */
router.use('/users', UserController)
router.use('/listings', ListingController)

router.get('/ping', (req, res) => {
  res.send({
    hello: 'world'
  })
})
