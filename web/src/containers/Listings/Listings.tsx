import React from 'react'
import './Listings.scss'
import ListingCard from '../../components/ListingCard/ListingCard'
import { ListingService, IListingEntity } from '../../services/ListingService'

// const marketingMumbo: string = '/img/Marketing-mumbo.svg'
const livImage: string = '/img/Marketing-mumbo-use-liv.svg'
const altImage: string = '/img/Marketing-mumbo-use-everything-else.svg'
const genericDate: Date = new Date('August 19th, 2019 20:32:00')
const emptyListing: IListingEntity = {
  id: 0,
  createDate: genericDate,
  title: '',
  location: '',
  price: '',
  beds: 0,
  sqft: 0,
  listingUrl: '',
  imageUrl: ''
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

  componentDidMount = async () => {
    // show the placeholder items
    // check if still loading
    const allListings = (await ListingService.getAllListings()).slice(0, 30)
    this.setState({
      allListings: allListings,
      loading: false
    })
  }

  renderAllListings = () => {
    if (this.state.loading === true) {
      console.log('showing filler')
        return this.displayLoadingCards()
    } else {
      console.log('showing real')
      return this.state.allListings.map(this.displaySingleListing)
    }
  }

  displaySingleListing = (info: IListingEntity, index: number) => {
    return <ListingCard key={index} loading={this.state.loading} info={info} />
  }

  displayLoadingCards = () => {
    return [
      <ListingCard key={1} loading={true} info={emptyListing} />,
      <ListingCard key={2} loading={true} info={emptyListing} />,
      <ListingCard key={3} loading={true} info={emptyListing} />
    ]
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
