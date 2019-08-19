export interface IFetchedListing {
  title: string
  location: string | null
  price: string
  beds: number | null
  sqft: number | null
  listingUrl: string
  imageUrl: string
}

export interface IListingEntity extends IFetchedListing {
  id: number
  createDate: Date
}

export interface IListingDetails {
  baths: number | null
  description: string
  images: string[]
  attributes: string[]
}

export type FullListingDetails = IListingDetails & IListingEntity
