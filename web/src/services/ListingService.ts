import { API } from './constants'

export interface IFetchedListing {
  // the response from CL (you don’t have to worry about this one really)
  title: string
  location: string | null
  price: string
  beds: number | null
  sqft: number | null
  listingUrl: string
  imageUrl: string
}

export interface IListingEntity extends IFetchedListing {
  //  the database response of each listing, what you will receive on the client side. This will be an array like.. IListingEntity[]
  id: number
  createDate: Date
}

export interface IListingDetails {
  //  don’t have to worry about this
  baths: number | null
  description: string
  images: string[]
  attributes: string[]
}

export type FullListingDetails = IListingDetails & IListingEntity
// listing details page

export const ListingService = {
  async getAllListings(): Promise<IListingEntity[]> {
    try {
      return await API.get('/listings').then(({ data }: { data: IListingEntity[] }) => {
        if (data.length > 100) {
        console.log('sliced')
          return (data.slice(0, 100))
        } else {
          return data
        }
      })
    } catch (err) {
      console.log(err)
      return []
    }
  },

  async getSingleListing(id: string): Promise<FullListingDetails> {
    try {
      return await API.get(`/listings/${id}`).then(({ data }: { data: FullListingDetails }) => {
        console.log(data)
        return data
      })
    } catch (err) {
      console.log(err)
      return err
    }
  }
}
