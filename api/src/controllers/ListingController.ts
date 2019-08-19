import { Router } from 'express'
import { ListingService } from '../services/ListingService'
import { isNumber } from '../models/Validation'
import { ArgumentError } from '../models/Error'

const router = Router()
export default router

router.get('/', async (req, res, next) => {
  try {
    const response = await ListingService.getAll()
    res.send(response)
  } catch (error) {
    next(error)
  }
})

router.get('/:listingId', async (req, res, next) => {
  try {
    const listingId = parseInt(req.params.listingId)
    if (!isNumber(listingId)) {
      throw new ArgumentError('listingId', 'listingId must be a number')
    }
    const response = await ListingService.getById(listingId)
    res.send(response)
  } catch (error) {
    next(error)
  }
})
