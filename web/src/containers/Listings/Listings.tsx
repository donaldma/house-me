import React from 'react'
import './Listings.scss'
import ListingCard, { IListingInfo } from '../../components/ListingCard/ListingCard'

const marketingMumbo: string = '/img/Marketing-mumbo.svg'
const livImage: string = '/img/Marketing-mumbo-use-liv.svg'
const altImage: string = '/img/Marketing-mumbo-use-everything-else.svg'
const emptyListing: IListingInfo = {
  imgURL: '',
  title: '',
  subtitle: '',
  beds: 0,
  bath: 0,
  cost: 0,
  sqft: 0,
  src: ''
}

interface IListingsState {
  loading: boolean
  allListings: IListingInfo[]
  maxResults: number
}

class Listings extends React.Component<{}, IListingsState> {
  state = {
    loading: true, // important in-case user wants to reload or change search criteria
    allListings: [],
    maxResults: 30
  }

  componentWillMount = () => {
    // show the placeholder items
    // check if still loading
    this.setState({
      loading: false,
      allListings: mockData
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

  displaySingleListing = (info: IListingInfo, index: number) => {
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
            <div className='searchResults'>
        {this.renderAllListings()}
            </div>
      </div>
    )
  }
}
export default Listings

const mockData: IListingInfo[] = [
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 1',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 2',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 3',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 4',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 5',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 6',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 7',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 8',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  },
  {
    imgURL: 'https://d2jydbnljbirzw.cloudfront.net/fit-in/735x500/filters:quality(100)/static_files/unit/2396/unit_2396_5d5886b65ad61_blob',
    title: 'title here 9',
    subtitle: 'subtitle here',
    beds: 6,
    bath: 3,
    cost: 5000,
    sqft: 345,
    src: 'https://www.facebook.com/marketplace'
  }
]
