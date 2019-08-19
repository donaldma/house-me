import knex from '../config/knex'
import { IListingEntity, IFetchedListing } from '../models/Listing'
import { NotFoundError } from '../models/Error'

const listingTable = 'listing'
const dateTimeQuery = `((DATE_PART('day', NOW()::timestamp - "createDate"::timestamp) * 24 +
DATE_PART('hour', NOW()::timestamp - "createDate"::timestamp)) * 60 +
DATE_PART('minute', NOW()::timestamp - "createDate"::timestamp)) < 60`

class ListingRepository {
  async getAll(): Promise<IListingEntity[]> {
    return await knex(listingTable).whereRaw(dateTimeQuery)
  }

  async create(request: IFetchedListing): Promise<void> {
    await knex(listingTable).insert(request)
  }

  async getById(listingId: number): Promise<IListingEntity> {
    const listingEntity: IListingEntity = await knex(listingTable)
      .where('id', listingId)
      .whereRaw(dateTimeQuery)
      .first()
    if (!listingEntity) {
      throw new NotFoundError('listing', 'Listing not found')
    }
    return listingEntity
  }
}

const ListingRepositoryInstance = new ListingRepository()
export { ListingRepositoryInstance as ListingRepository }
