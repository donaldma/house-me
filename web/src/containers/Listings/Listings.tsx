import React from 'react'
import './Listings.scss'
import ListingCard from '../../components/ListingCard/ListingCard'
import { ListingService, IListingEntity } from '../../services/ListingService'

// const marketingMumbo: string = '/img/Marketing-mumbo.svg'
const livImage: string = '/img/Marketing-mumbo-use-liv.svg'
const altImage: string = '/img/Marketing-mumbo-use-everything-else.svg'
const emptyListing: IListingEntity = {
  id: 0,
  createDate: new Date('August 19th, 2019 20:32:00'),
  title: '',
  location: '',
  price: '',
  beds: 0,
  sqft: 0,
  listingUrl: '',
  imageUrl: '',
}

interface IListingsState {
  loading: boolean
  allListings: IListingEntity[]
  maxResults: number
}

class Listings extends React.Component<{}, IListingsState> {
  state = {
    loading: true, // important in-case user wants to reload or change search criteria
    allListings: [],
    maxResults: 30
  }

  componentWillMount = async () => {
    // show the placeholder items
    // check if still loading
    const allListings = await ListingService.getAllListings()
    this.setState({
      loading: false,
      allListings: allListings
    })
  }

  renderAllListings = () => {
    if (this.state.loading === true) {
      for (let i = 0; i < this.state.maxResults; i++) {
        this.displaySingleListing(emptyListing, i)
      }
    } else {
      return this.state.allListings.map(this.displaySingleListing)
    }
  }

  displaySingleListing = (info: IListingEntity, index: number) => {
    console.log(index, info)
    return <ListingCard key={index} loading={this.state.loading} info={info} />
  }

  render() {
    return (
      <div>
        <div className='searchBar'></div>
        <div className='banner'>
          <div className='banner-overlay'>
            <div className='banner-text'>
              <h1 className='banner-title white-text'>Grow organic traffic</h1>
              <h3 className='white-text'>By creating a one-stop site for all prospective renters</h3>
              <div className='illustration-overlay'>
                <img className='inline-img' src={altImage} alt='use-everything' />
                <img className='inline-img' src={livImage} alt='use-liv' />
              </div>
            </div>
          </div>
        </div>
        <div className='searchResults'>{this.renderAllListings()}</div>
      </div>
    )
  }
}
export default Listings

const mockData: IListingEntity[] = [
  {
    id: 1,
    createDate: new Date('August 19th, 2019 20:32:00'),
    imageUrl:
      'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 1',
    location: 'subtitle here',
    beds: 6,
    price: '5000',
    sqft: 345,
    listingUrl: 'https://www.facebook.com/marketplace'
  },  {
    id: 2,
    createDate: new Date('August 19th, 2019 20:32:00'),
    imageUrl:
      'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 1',
    location: 'subtitle here',
    beds: 6,
    price: '5000',
    sqft: 345,
    listingUrl: 'https://www.facebook.com/marketplace'
  },  {
    id: 3,
    createDate: new Date('August 19th, 2019 20:32:00'),
    imageUrl:
      'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 1',
    location: 'subtitle here',
    beds: 6,
    price: '5000',
    sqft: 345,
    listingUrl: 'https://www.facebook.com/marketplace'
  },  {
    id: 4,
    createDate: new Date('August 19th, 2019 20:32:00'),
    imageUrl:
      'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 1',
    location: 'subtitle here',
    beds: 6,
    price: '5000',
    sqft: 345,
    listingUrl: 'https://www.facebook.com/marketplace'
  },
]
