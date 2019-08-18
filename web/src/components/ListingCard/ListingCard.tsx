import React from 'react'
import './ListingCard.scss'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

const MyLoader = () => (
  <ContentLoader height={380} width={280} speed={2} primaryColor='#f3f3f3' secondaryColor='#ecebeb'>
    <rect x='0' y='0' rx='4' ry='4' width='338' height='255' />
    <rect x='8' y='275' rx='4' ry='4' width='264' height='15' />
    <rect x='8' y='305' rx='4' ry='4' width='264' height='15' />
    <rect x='8' y='340' rx='4' ry='4' width='264' height='15' />
  </ContentLoader>
)
const userIcon: string = './img/user-icon.svg'
const userIconPurple: string = './img/user-icon-purple.svg'
const userIconGreen: string = './img/user-icon-green.svg'
const userIconPink: string = './img/user-icon-pink.svg'
const userIconYellow: string = './img/user-icon-yellow.svg'

export interface IListingInfo {
  imgURL: string
  title: string
  subtitle: string
  beds: number
  bath: number
  cost: number
  sqft: number
  src: string
}

interface IListingCardProps {
  loading: boolean
  info: IListingInfo
}

class ListingCard extends React.Component<IListingCardProps, {}> {
  getRandomUserIcon = () => {
    switch (
      Math.floor(Math.random() * Math.floor(5)) // I know it's a magic number
    ) {
      case 1: {
        return userIcon
      } case 2: {
        return userIconGreen
      } case 3: {
        return userIconPink
      } case 4: {
        return userIconPurple
      } case 5: {
        return userIconYellow
      } default: {
        return userIcon
      }
    }
  }

  showIfLoaded = () => {
    if (this.props.loading) {
      return (
        <div>
          <MyLoader />
        </div>
      )
    } else {
      return (
        <Link to={`/`}>
          <div className='photoSection'>
            <img className='peekPhoto' src={this.props.info.imgURL} alt='rental-unit-photo' />
            <img className='userIcon' src={this.getRandomUserIcon()} alt='user-icon'/>
          </div>
          <div className='info'>
            <div className='upper-info'>
              <h1>{this.props.info.title}</h1>
              <h3>{this.props.info.subtitle}</h3>
              <br />
              <h3>
                {this.props.info.beds} Beds - {this.props.info.bath} Baths
              </h3>
            </div>
            <div className='lower-info'>
              <span>
                <h1 className='inline'>
                  <strong>{this.props.info.cost}</strong>
                </h1>
                <h4 className='inline'> / Month</h4>
              </span>
              <span>
                <h4>{this.props.info.sqft} SQFT</h4>
              </span>
            </div>
          </div>
        </Link>
      )
    }
  }

  render() {
    return <div className='listingCard'>{this.showIfLoaded()}</div>
  }
}
export default ListingCard
