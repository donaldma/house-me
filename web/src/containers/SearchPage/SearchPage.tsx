import React from 'react'
import './SearchPage.scss'
import { Link } from 'react-router-dom'
import AboutButton from '../../components/AboutButton/AboutButton';

const searchIcon: string = '/img/search-icon.svg'
const nextIcon: string = '/img/next.svg'

class SearchPage extends React.Component<{}, {}> {
  render() {
    return (
      <div id='searchPage'>
        <div id='title'>
          <h1 className='banner-title'>Rental Automated</h1>
          <h3 className='banner-subtitle'>
            Browse rental properties across the web.
            <br />{' '}
            <Link to='/how'>
              <span className='highlight-link'>And get natural traffic through Liv.</span>
            </Link>
          </h3>
          <div id='searchBar'>
            <Link to='/listings'>
              <button id='search-btn'>
                <div id='search-btn-text'>
                  <span>
                    <img id='searchIcon' src={searchIcon} alt='search-icon' />
                    Search in Richmond
                  </span>
                  <span>
                    <img id='nextIcon' src={nextIcon} alt='icon-go-next' />
                  </span>
                </div>
              </button>
            </Link>
            <div className='details-text blue-text'>This prototype is only for Richmond</div>
          
          </div>
        </div>
        <AboutButton/>
      </div>
    )
  }
}

export default SearchPage
